#!/usr/bin/env node
/**
 * Kimi Agent Dispatcher for StorePilot
 *
 * Executable orchestration layer that:
 * 1. Reads pipeline.json status (structured, not markdown tables)
 * 2. Determines next runnable phase based on prerequisites
 * 3. Builds agent dispatch prompts with framework context
 * 4. Validates PHASE_RESULT against JSON schema
 * 5. Updates pipeline status atomically
 *
 * Usage:
 *   node .kimi/scripts/dispatcher.js status <project>
 *   node .kimi/scripts/dispatcher.js next <project>
 *   node .kimi/scripts/dispatcher.js run <project> --phase <name>
 *   node .kimi/scripts/dispatcher.js init <project> --backend nestjs --frontend react
 *   node .kimi/scripts/dispatcher.js validate-phase-result <phase-result.json>
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const KIMI_DIR = path.resolve(__dirname, '..');
const PROJECT_DIR = path.resolve(KIMI_DIR, '..');
const STATUS_DIR = path.join(PROJECT_DIR, '.project', 'status');
const REGISTRY_PATH = path.join(KIMI_DIR, 'agents', 'agent-registry.json');
const SCHEMA_PATH = path.join(KIMI_DIR, 'base', 'schemas', 'pipeline.json');
const PHASE_RESULT_SCHEMA_PATH = path.join(KIMI_DIR, 'base', 'schemas', 'phase-result.json');
const TEMPLATE_PATH = path.join(KIMI_DIR, 'base', 'templates', 'pipeline-status.json');

// ─── Utils ──────────────────────────────────────────────────────────

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function saveJson(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

function fail(msg) {
  console.error('❌', msg);
  process.exit(1);
}

function ok(msg) {
  console.log('✅', msg);
}

function info(msg) {
  console.log('ℹ️ ', msg);
}

function getStatusPath(project) {
  return path.join(STATUS_DIR, project, 'pipeline.json');
}

function getMarkdownStatusPath(project) {
  return path.join(STATUS_DIR, project, 'PIPELINE_STATUS.md');
}

// ─── Pipeline Logic ─────────────────────────────────────────────────

function loadPipeline(project) {
  const p = getStatusPath(project);
  if (!fs.existsSync(p)) {
    fail(`Pipeline status not found: ${p}\nRun: node dispatcher.js init ${project}`);
  }
  return loadJson(p);
}

function findNextPhase(pipeline) {
  const completed = new Set(
    pipeline.phases.filter(ph => ph.status === 'complete').map(ph => ph.name)
  );
  return pipeline.phases.find(ph => {
    if (ph.status === 'complete') return false;
    const prereqsMet = ph.prerequisites.every(pr => completed.has(pr));
    return prereqsMet;
  });
}

function validatePrerequisites(pipeline, phaseName) {
  const phase = pipeline.phases.find(ph => ph.name === phaseName);
  if (!phase) fail(`Unknown phase: ${phaseName}`);
  const completed = new Set(
    pipeline.phases.filter(ph => ph.status === 'complete').map(ph => ph.name)
  );
  const missing = phase.prerequisites.filter(pr => !completed.has(pr));
  if (missing.length > 0) {
    fail(`Cannot run '${phaseName}': prerequisites not met: ${missing.join(', ')}`);
  }
  return phase;
}

// ─── Agent Registry & Context Builder ───────────────────────────────

function loadRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    fail(`Agent registry not found: ${REGISTRY_PATH}`);
  }
  return loadJson(REGISTRY_PATH);
}

function resolveAgentForPhase(phaseName, techStack) {
  const map = {
    init: null,
    prd: 'documentation-architect',
    database: 'backend-developer',
    backend: 'backend-developer',
    frontend: 'frontend-developer',
    integrate: 'frontend-developer',
    test: 'quality-lead',
    qa: 'quality-lead',
    ship: null
  };
  return map[phaseName] || null;
}

function resolveSkillPath(phase, backend, frontend) {
  const tierMap = {
    base: path.join(KIMI_DIR, 'skills'),
    nestjs: path.join(KIMI_DIR, 'backend', 'guides'),
    django: path.join(KIMI_DIR, 'backend', 'guides'),
    react: path.join(KIMI_DIR, 'frontend', 'guides'),
    'react-native': path.join(KIMI_DIR, 'mobile', 'guides'),
    stack: path.join(KIMI_DIR, 'skills')
  };

  const tierDir = tierMap[phase.tier] || tierMap.base;

  // Common skill mappings
  const skillFileMap = {
    'project-init.md': 'run-fullstack/SKILL.md',
    'convert-prd-to-knowledge.md': 'docs/SKILL.md',
    'database-schema-designer.md': 'crud-module-generator/SKILL.md',
    'api-integration.md': 'feature/SKILL.md',
    'e2e-test-generator.md': 'e2e-test-generator/SKILL.md',
    'design-qa-patterns.md': 'gap/SKILL.md',
    'deployment.md': 'run-fullstack/SKILL.md'
  };

  if (phase.skill === 'composite') {
    return path.join(tierDir, 'ARCHITECTURE-OVERVIEW-GUIDE.md');
  }

  const mapped = skillFileMap[phase.skill];
  if (mapped) {
    return path.join(KIMI_DIR, 'skills', mapped);
  }

  // Fallback: try tier dir
  const direct = path.join(tierDir, phase.skill);
  if (fs.existsSync(direct)) return direct;

  // Fallback: try skills dir
  const skillDir = path.join(KIMI_DIR, 'skills');
  const skillAttempt = path.join(skillDir, phase.skill, 'SKILL.md');
  if (fs.existsSync(skillAttempt)) return skillAttempt;

  return null;
}

function buildFrameworkContext(stack) {
  const contexts = [];
  const frameworks = [];

  if (stack.backend) frameworks.push(stack.backend);
  if (stack.frontends) frameworks.push(...stack.frontends);

  for (const fw of [...new Set(frameworks)]) {
    const guideDir = path.join(KIMI_DIR, fw === 'nestjs' ? 'backend' : fw === 'react' ? 'frontend' : fw === 'react-native' ? 'mobile' : fw, 'guides');
    if (!fs.existsSync(guideDir)) continue;

    const files = fs.readdirSync(guideDir).filter(f => f.endsWith('.md') && f !== 'README.md');
    // Limit to 5 most relevant to save tokens
    const top5 = files.slice(0, 5);
    contexts.push(`📚 ${fw.toUpperCase()} RESOURCES (${files.length} guides, showing top ${top5.length}):`);
    for (const f of top5) {
      contexts.push(`  → ${f}`);
    }
    if (files.length > 5) contexts.push(`  (+ ${files.length - 5} more)`);
  }

  return contexts.join('\n');
}

function buildAgentPrompt(project, phase, pipeline) {
  const registry = loadRegistry();
  const agentName = resolveAgentForPhase(phase.name, pipeline.tech_stack);
  if (!agentName) {
    return { agent: null, prompt: null, mode: 'direct' };
  }

  // Find agent definition
  let agentDef = null;
  for (const cat of Object.values(registry.agents || {})) {
    if (cat[agentName]) { agentDef = cat[agentName]; break; }
  }
  if (!agentDef) fail(`Agent '${agentName}' not found in registry`);

  const agentFilePath = path.join(KIMI_DIR, 'agents', agentDef.file);
  let persona = '';
  if (fs.existsSync(agentFilePath)) {
    persona = fs.readFileSync(agentFilePath, 'utf8');
  }

  const skillPath = resolveSkillPath(phase, pipeline.tech_stack.backend, pipeline.tech_stack.frontends?.[0]);
  const frameworkContext = buildFrameworkContext(pipeline.tech_stack);

  // Build compact prior context (≤ 300 tokens)
  const priorPhases = pipeline.phases
    .filter(ph => ph.status === 'complete' && ph.agent_result)
    .map(ph => `- ${ph.name}: ${ph.agent_result.summary}`)
    .join('\n');

  const prompt = `
${persona}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 ORCHESTRATION CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project: ${project}
Phase: ${phase.name} (${phase.tier} tier)
Skill: ${skillPath || 'N/A'}

${frameworkContext}

Prior completed phases:
${priorPhases || '(none)'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 TASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Follow the skill instructions and implement this phase.
Read the skill file for detailed steps.

After completing work, you MUST return PHASE_RESULT in this exact format:

PHASE_RESULT:
{
  "phase": "${phase.name}",
  "status": "complete | failed | partial",
  "summary": "One sentence, max 200 chars",
  "counts": {
    "files_created": 0,
    "endpoints_implemented": 0,
    "entities_created": 0,
    "tests_generated": 0,
    "gaps_found": 0
  },
  "top_issues": [],
  "artifact_paths": [],
  "next_phase_hints": ""
}

Size limit: ≤ 500 tokens. Use counts, not lists.
`.trim();

  return { agent: agentName, agentDef, prompt, mode: 'dispatch', skillPath };
}

// ─── PHASE_RESULT Validation ────────────────────────────────────────

function validatePhaseResult(data) {
  const schema = loadJson(PHASE_RESULT_SCHEMA_PATH);
  const errors = [];

  function checkType(val, expected, path) {
    if (expected === 'integer') {
      if (!Number.isInteger(val)) errors.push(`${path}: expected integer, got ${typeof val}`);
    } else if (typeof val !== expected) {
      errors.push(`${path}: expected ${expected}, got ${typeof val}`);
    }
  }

  function validate(obj, sch, path = '') {
    if (sch.required) {
      for (const key of sch.required) {
        if (!(key in obj)) errors.push(`${path}.${key}: required property missing`);
      }
    }

    for (const [key, prop] of Object.entries(sch.properties || {})) {
      if (!(key in obj)) continue;
      const val = obj[key];
      const ppath = path ? `${path}.${key}` : key;

      if (prop.type === 'object') {
        if (val !== null) validate(val, prop, ppath);
      } else if (prop.type === 'array') {
        if (!Array.isArray(val)) {
          errors.push(`${ppath}: expected array`);
        } else {
          if (prop.maxItems && val.length > prop.maxItems) {
            errors.push(`${ppath}: max ${prop.maxItems} items, got ${val.length}`);
          }
          for (let i = 0; i < val.length; i++) {
            if (prop.items.type === 'object') {
              validate(val[i], prop.items, `${ppath}[${i}]`);
            } else {
              checkType(val[i], prop.items.type, `${ppath}[${i}]`);
            }
          }
        }
      } else if (prop.enum) {
        if (!prop.enum.includes(val)) errors.push(`${ppath}: expected one of [${prop.enum.join(', ')}], got "${val}"`);
      } else {
        checkType(val, prop.type, ppath);
        if (prop.minLength !== undefined && typeof val === 'string' && val.length < prop.minLength) {
          errors.push(`${ppath}: min length ${prop.minLength}, got ${val.length}`);
        }
        if (prop.maxLength !== undefined && typeof val === 'string' && val.length > prop.maxLength) {
          errors.push(`${ppath}: max length ${prop.maxLength}, got ${val.length}`);
        }
      }
    }

    if (sch.additionalProperties === false) {
      const allowed = new Set(Object.keys(sch.properties || {}));
      for (const key of Object.keys(obj)) {
        if (!allowed.has(key)) errors.push(`${path}: additional property "${key}" not allowed`);
      }
    }
  }

  validate(data, schema);
  return errors;
}

// ─── Commands ───────────────────────────────────────────────────────

function cmdStatus(project) {
  const pipeline = loadPipeline(project);
  console.log(`\nFullstack Pipeline — ${project}\n${'='.repeat(40)}\n`);
  console.log(`Phase       | Status      | Agent        | Output`);
  console.log(`------------|-------------|--------------|------------------`);
  for (const ph of pipeline.phases) {
    const status = ph.status.padEnd(11);
    const agent = (ph.agent || '-').padEnd(12);
    const out = (ph.output || '-').slice(0, 20).padEnd(20);
    console.log(`${ph.name.padEnd(11)} | ${status} | ${agent} | ${out}`);
  }
  const next = findNextPhase(pipeline);
  if (next) {
    console.log(`\nNext: ${next.name} (run with --phase ${next.name})`);
  } else {
    const failed = pipeline.phases.find(ph => ph.status === 'failed');
    if (failed) {
      console.log(`\n⚠️  Pipeline blocked: phase '${failed.name}' failed`);
    } else {
      console.log(`\n✅ Pipeline complete`);
    }
  }
  console.log();
}

function cmdInit(project, args) {
  const statusPath = getStatusPath(project);
  if (fs.existsSync(statusPath)) {
    fail(`Pipeline already exists for '${project}'. Use a different name or delete ${statusPath}`);
  }

  let template = JSON.parse(fs.readFileSync(TEMPLATE_PATH, 'utf8'));
  template.project = project;
  template.created = new Date().toISOString();

  // Parse --backend and --frontend flags
  const backendIdx = args.indexOf('--backend');
  if (backendIdx !== -1 && args[backendIdx + 1]) {
    template.tech_stack.backend = args[backendIdx + 1];
  }
  const frontendIdx = args.indexOf('--frontend');
  if (frontendIdx !== -1 && args[frontendIdx + 1]) {
    template.tech_stack.frontends = [args[frontendIdx + 1]];
  }

  saveJson(statusPath, template);

  // Also create/update markdown mirror for human readability
  syncMarkdown(project, template);

  ok(`Initialized pipeline for '${project}'`);
  info(`Status: ${statusPath}`);
}

function cmdNext(project) {
  const pipeline = loadPipeline(project);
  const next = findNextPhase(pipeline);
  if (!next) {
    info('No pending phases with met prerequisites.');
    return;
  }
  info(`Next phase: ${next.name} (${next.tier} tier)`);

  const { agent, mode, skillPath } = buildAgentPrompt(project, next, pipeline);
  if (mode === 'direct') {
    info(`Phase '${next.name}' runs in DIRECT mode (no agent dispatch).`);
  } else {
    info(`Agent: ${agent}`);
    info(`Skill: ${skillPath || 'N/A'}`);
    info(`\nRun with: node dispatcher.js run ${project} --phase ${next.name}`);
  }
}

function cmdRun(project, args) {
  const phaseIdx = args.indexOf('--phase');
  if (phaseIdx === -1 || !args[phaseIdx + 1]) {
    fail('Usage: run <project> --phase <name>');
  }
  const phaseName = args[phaseIdx + 1];

  const pipeline = loadPipeline(project);
  const phase = validatePrerequisites(pipeline, phaseName);

  if (phase.status === 'in_progress') {
    fail(`Phase '${phaseName}' is already in progress.`);
  }

  const { agent, prompt, mode, skillPath } = buildAgentPrompt(project, phase, pipeline);

  if (mode === 'direct') {
    info(`Phase '${phaseName}' runs in DIRECT mode.`);
    info(`Follow the skill instructions manually, then update status.`);
    return;
  }

  // Write the prompt to a file so user can copy/paste or Kimi can read it
  const promptPath = path.join(STATUS_DIR, project, `${phaseName}-dispatch-prompt.md`);
  fs.mkdirSync(path.dirname(promptPath), { recursive: true });
  fs.writeFileSync(promptPath, prompt);

  // Update status
  phase.status = 'in_progress';
  phase.agent = agent;
  phase.started_at = new Date().toISOString();
  saveJson(getStatusPath(project), pipeline);
  syncMarkdown(project, pipeline);

  ok(`Phase '${phaseName}' marked as in_progress`);
  info(`Agent: ${agent}`);
  info(`Dispatch prompt written to: ${promptPath}`);
  info(`\nTo dispatch: use the Agent tool with the prompt from ${promptPath}`);
  info(`After agent completes, validate with: node dispatcher.js validate-phase-result <result.json>`);
}

function cmdValidatePhaseResult(args) {
  const fileIdx = args.findIndex(a => a.endsWith('.json'));
  if (fileIdx === -1) fail('Usage: validate-phase-result <phase-result.json>');
  const filePath = args[fileIdx];
  if (!fs.existsSync(filePath)) fail(`File not found: ${filePath}`);

  let data;
  try {
    data = loadJson(filePath);
  } catch (e) {
    fail(`Invalid JSON: ${e.message}`);
  }

  const errors = validatePhaseResult(data);
  if (errors.length === 0) {
    ok('PHASE_RESULT is valid');
  } else {
    console.error('❌ PHASE_RESULT validation failed:');
    for (const err of errors) console.error(`   - ${err}`);
    process.exit(1);
  }
}

function cmdComplete(project, args) {
  const phaseIdx = args.indexOf('--phase');
  const resultIdx = args.indexOf('--result');
  if (phaseIdx === -1) fail('Usage: complete <project> --phase <name> --result <phase-result.json>');

  const phaseName = args[phaseIdx + 1];
  const pipeline = loadPipeline(project);
  const phase = pipeline.phases.find(ph => ph.name === phaseName);
  if (!phase) fail(`Unknown phase: ${phaseName}`);

  let result = null;
  if (resultIdx !== -1 && args[resultIdx + 1]) {
    result = loadJson(args[resultIdx + 1]);
    const errors = validatePhaseResult(result);
    if (errors.length > 0) {
      for (const err of errors) console.error(`❌ ${err}`);
      fail('PHASE_RESULT validation failed. Fix and retry.');
    }
  }

  phase.status = result?.status === 'failed' ? 'failed' : 'complete';
  phase.completed_at = new Date().toISOString();
  if (phase.started_at) {
    phase.duration_seconds = Math.round((new Date(phase.completed_at) - new Date(phase.started_at)) / 1000);
  }
  phase.agent_result = result;
  if (result?.artifact_paths?.length) {
    phase.output = result.artifact_paths.join(', ');
  }
  if (result?.top_issues?.length) {
    phase.notes = result.top_issues.join('; ');
  }

  pipeline.last_run = new Date().toISOString();

  // Add to execution log (keep max 20)
  pipeline.execution_log.push({
    date: new Date().toISOString(),
    phase: phaseName,
    duration_seconds: phase.duration_seconds || 0,
    agent: phase.agent || 'unknown',
    result: phase.status === 'complete' ? 'success' : 'failure',
    notes: result?.summary || ''
  });
  if (pipeline.execution_log.length > 20) {
    pipeline.execution_log = pipeline.execution_log.slice(-20);
  }

  saveJson(getStatusPath(project), pipeline);
  syncMarkdown(project, pipeline);

  ok(`Phase '${phaseName}' marked as ${phase.status}`);
}

// ─── Markdown Sync ──────────────────────────────────────────────────

function syncMarkdown(project, pipeline) {
  const mdPath = getMarkdownStatusPath(project);
  let md = `# Fullstack Pipeline Status - ${pipeline.project}\n\n`;
  md += `## Progress\n\n`;
  md += `| Phase | Skill | Tier | Status | Prerequisites | Output | Notes |\n`;
  md += `|-------|-------|------|--------|---------------|--------|-------|\n`;

  const statusEmoji = {
    pending: ':clipboard:',
    in_progress: ':construction:',
    complete: ':white_check_mark:',
    failed: ':x:',
    blocked: ':no_entry:'
  };

  for (const ph of pipeline.phases) {
    const emoji = statusEmoji[ph.status] || ph.status;
    const prereq = ph.prerequisites.join(', ') || '-';
    const output = (ph.output || '-').replace(/\|/g, '\\|');
    const notes = (ph.notes || '-').replace(/\|/g, '\\|');
    md += `| ${ph.name} | ${ph.skill} | ${ph.tier} | ${emoji} ${ph.status} | ${prereq} | ${output} | ${notes} |\n`;
  }

  md += `\n## Execution Log\n\n`;
  md += `| Date | Phase | Duration | Agent | Result | Notes |\n`;
  md += `|------|-------|----------|-------|--------|-------|\n`;
  for (const entry of pipeline.execution_log) {
    const date = entry.date.slice(0, 19).replace('T', ' ');
    md += `| ${date} | ${entry.phase} | ${entry.duration_seconds}s | ${entry.agent} | ${entry.result} | ${entry.notes} |\n`;
  }

  md += `\n## Configuration\n\n`;
  md += `\`\`\`yaml\n`;
  md += `project: ${pipeline.project}\n`;
  md += `created: ${pipeline.created}\n`;
  md += `last_run: ${pipeline.last_run || 'null'}\n`;
  md += `tech_stack: ${pipeline.tech_stack.backend}+${pipeline.tech_stack.frontends.join(',')}\n`;
  md += `\`\`\`\n`;

  fs.mkdirSync(path.dirname(mdPath), { recursive: true });
  fs.writeFileSync(mdPath, md);
}

// ─── Main ───────────────────────────────────────────────────────────

const [,, command, ...args] = process.argv;

switch (command) {
  case 'status':
    cmdStatus(args[0]);
    break;
  case 'init':
    cmdInit(args[0], args.slice(1));
    break;
  case 'next':
    cmdNext(args[0]);
    break;
  case 'run':
    cmdRun(args[0], args.slice(1));
    break;
  case 'complete':
    cmdComplete(args[0], args.slice(1));
    break;
  case 'validate-phase-result':
    cmdValidatePhaseResult(args);
    break;
  default:
    console.log(`
Kimi Agent Dispatcher — StorePilot

Usage:
  node dispatcher.js status <project>
  node dispatcher.js init <project> [--backend nestjs|django] [--frontend react|react-native]
  node dispatcher.js next <project>
  node dispatcher.js run <project> --phase <name>
  node dispatcher.js complete <project> --phase <name> --result <phase-result.json>
  node dispatcher.js validate-phase-result <phase-result.json>

Examples:
  node dispatcher.js init my-app --backend nestjs --frontend react
  node dispatcher.js status my-app
  node dispatcher.js next my-app
  node dispatcher.js run my-app --phase backend
  node dispatcher.js complete my-app --phase backend --result backend-result.json
`);
    process.exit(0);
}
