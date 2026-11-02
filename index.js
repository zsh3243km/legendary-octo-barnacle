var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../../../AppData/Roaming/npm/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../../AppData/Roaming/npm/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// src/db.js
async function one(env2, sql, params = []) {
  const st = env2.DB.prepare(sql);
  return await (params.length ? st.bind(...params) : st).first();
}
__name(one, "one");
async function all(env2, sql, params = []) {
  const st = env2.DB.prepare(sql);
  const res = await (params.length ? st.bind(...params) : st).all();
  return res.results || [];
}
__name(all, "all");
async function run(env2, sql, params = []) {
  const st = env2.DB.prepare(sql);
  return await (params.length ? st.bind(...params) : st).run();
}
__name(run, "run");
function changesOf(res) {
  return res && res.meta && typeof res.meta.changes === "number" ? res.meta.changes : 0;
}
__name(changesOf, "changesOf");
var SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY,
		username TEXT,
		first_name TEXT,
		balance INTEGER NOT NULL DEFAULT 0,
		banned INTEGER NOT NULL DEFAULT 0,
		trial_used INTEGER NOT NULL DEFAULT 0,
		created_at TEXT NOT NULL
	)`,
  `CREATE TABLE IF NOT EXISTS states (
		user_id INTEGER PRIMARY KEY,
		step TEXT NOT NULL,
		data TEXT NOT NULL DEFAULT '{}',
		updated_at TEXT NOT NULL
	)`,
  `CREATE TABLE IF NOT EXISTS links (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		pool TEXT NOT NULL,
		url TEXT NOT NULL UNIQUE,
		status TEXT NOT NULL DEFAULT 'free',
		assigned_to INTEGER,
		order_id INTEGER,
		created_at TEXT NOT NULL,
		assigned_at TEXT
	)`,
  `CREATE INDEX IF NOT EXISTS idx_links_pool_status ON links (pool, status)`,
  `CREATE TABLE IF NOT EXISTS orders (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		kind TEXT NOT NULL,
		pool TEXT,
		plan_id TEXT,
		renew_service_id INTEGER,
		amount INTEGER NOT NULL DEFAULT 0,
		discount_code TEXT,
		discount_value INTEGER NOT NULL DEFAULT 0,
		final_amount INTEGER NOT NULL DEFAULT 0,
		method TEXT,
		status TEXT NOT NULL,
		receipt_file_id TEXT,
		receipt_chat_id INTEGER,
		receipt_message_id INTEGER,
		admin_id INTEGER,
		created_at TEXT NOT NULL,
		decided_at TEXT
	)`,
  `CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status)`,
  `CREATE TABLE IF NOT EXISTS services (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		order_id INTEGER,
		link_id INTEGER,
		url TEXT NOT NULL,
		pool TEXT NOT NULL,
		plan_id TEXT,
		plan_title TEXT NOT NULL,
		volume TEXT NOT NULL,
		days INTEGER NOT NULL,
		is_trial INTEGER NOT NULL DEFAULT 0,
		started_at TEXT NOT NULL,
		expires_at TEXT NOT NULL,
		status TEXT NOT NULL DEFAULT 'active'
	)`,
  `CREATE INDEX IF NOT EXISTS idx_services_user ON services (user_id)`,
  `CREATE TABLE IF NOT EXISTS wallet_tx (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		amount INTEGER NOT NULL,
		kind TEXT NOT NULL,
		note TEXT,
		created_at TEXT NOT NULL
	)`,
  `CREATE TABLE IF NOT EXISTS codes (
		code TEXT PRIMARY KEY,
		kind TEXT NOT NULL,
		value INTEGER NOT NULL,
		max_uses INTEGER NOT NULL DEFAULT 1,
		used INTEGER NOT NULL DEFAULT 0,
		active INTEGER NOT NULL DEFAULT 1,
		created_by INTEGER,
		created_at TEXT NOT NULL
	)`,
  `CREATE TABLE IF NOT EXISTS code_uses (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		code TEXT NOT NULL,
		user_id INTEGER NOT NULL,
		order_id INTEGER,
		created_at TEXT NOT NULL
	)`,
  `CREATE TABLE IF NOT EXISTS settings (
		key TEXT PRIMARY KEY,
		value TEXT
	)`,
  `CREATE TABLE IF NOT EXISTS seen_updates (
		update_id INTEGER PRIMARY KEY,
		created_at TEXT NOT NULL
	)`
];
var schemaReady = false;
async function ensureSchema(env2, force = false) {
  if (schemaReady && !force) return;
  for (const sql of SCHEMA) await run(env2, sql);
  schemaReady = true;
}
__name(ensureSchema, "ensureSchema");
function nowIso() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(nowIso, "nowIso");
async function touchUser(env2, from) {
  await run(
    env2,
    `INSERT INTO users (id, username, first_name, created_at) VALUES (?, ?, ?, ?)
		 ON CONFLICT(id) DO UPDATE SET username = excluded.username, first_name = excluded.first_name`,
    [from.id, from.username || null, from.first_name || null, nowIso()]
  );
  return await getUser(env2, from.id);
}
__name(touchUser, "touchUser");
function getUser(env2, id) {
  return one(env2, `SELECT * FROM users WHERE id = ?`, [id]);
}
__name(getUser, "getUser");
function setBanned(env2, id, banned) {
  return run(env2, `UPDATE users SET banned = ? WHERE id = ?`, [banned ? 1 : 0, id]);
}
__name(setBanned, "setBanned");
function markTrialUsed(env2, id) {
  return run(env2, `UPDATE users SET trial_used = 1 WHERE id = ?`, [id]);
}
__name(markTrialUsed, "markTrialUsed");
async function addBalance(env2, userId, amount, kind, note) {
  await run(env2, `UPDATE users SET balance = balance + ? WHERE id = ?`, [amount, userId]);
  await run(
    env2,
    `INSERT INTO wallet_tx (user_id, amount, kind, note, created_at) VALUES (?, ?, ?, ?, ?)`,
    [userId, amount, kind, note || null, nowIso()]
  );
  const user = await getUser(env2, userId);
  return user ? user.balance : 0;
}
__name(addBalance, "addBalance");
async function spendBalance(env2, userId, amount, note) {
  const res = await run(
    env2,
    `UPDATE users SET balance = balance - ? WHERE id = ? AND balance >= ?`,
    [amount, userId, amount]
  );
  if (!changesOf(res)) return false;
  await run(
    env2,
    `INSERT INTO wallet_tx (user_id, amount, kind, note, created_at) VALUES (?, ?, ?, ?, ?)`,
    [userId, -amount, "purchase", note || null, nowIso()]
  );
  return true;
}
__name(spendBalance, "spendBalance");
async function getState(env2, userId) {
  const row = await one(env2, `SELECT * FROM states WHERE user_id = ?`, [userId]);
  if (!row) return { step: "idle", data: {} };
  let data = {};
  try {
    data = JSON.parse(row.data || "{}");
  } catch (err) {
    data = {};
  }
  return { step: row.step, data };
}
__name(getState, "getState");
function setState(env2, userId, step, data = {}) {
  return run(
    env2,
    `INSERT INTO states (user_id, step, data, updated_at) VALUES (?, ?, ?, ?)
		 ON CONFLICT(user_id) DO UPDATE SET step = excluded.step, data = excluded.data, updated_at = excluded.updated_at`,
    [userId, step, JSON.stringify(data || {}), nowIso()]
  );
}
__name(setState, "setState");
function clearState(env2, userId) {
  return run(env2, `DELETE FROM states WHERE user_id = ?`, [userId]);
}
__name(clearState, "clearState");
async function getSetting(env2, key, fallback = null) {
  const row = await one(env2, `SELECT value FROM settings WHERE key = ?`, [key]);
  return row && row.value !== null && row.value !== void 0 ? row.value : fallback;
}
__name(getSetting, "getSetting");
function setSetting(env2, key, value) {
  return run(
    env2,
    `INSERT INTO settings (key, value) VALUES (?, ?)
		 ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    [key, value]
  );
}
__name(setSetting, "setSetting");
async function addLinks(env2, pool, urls) {
  let added = 0;
  let duplicate = 0;
  for (const url of urls) {
    const res = await run(
      env2,
      `INSERT OR IGNORE INTO links (pool, url, status, created_at) VALUES (?, ?, 'free', ?)`,
      [pool, url, nowIso()]
    );
    if (changesOf(res)) added++;
    else duplicate++;
  }
  return { added, duplicate };
}
__name(addLinks, "addLinks");
function stockReport(env2) {
  return all(
    env2,
    `SELECT pool,
				SUM(CASE WHEN status = 'free' THEN 1 ELSE 0 END) AS free_count,
				SUM(CASE WHEN status = 'assigned' THEN 1 ELSE 0 END) AS used_count
		 FROM links GROUP BY pool`
  );
}
__name(stockReport, "stockReport");
function takeLink(env2, pool, userId, orderId) {
  return one(
    env2,
    `UPDATE links
			SET status = 'assigned', assigned_to = ?, order_id = ?, assigned_at = ?
			WHERE id = (SELECT id FROM links WHERE pool = ? AND status = 'free' ORDER BY id LIMIT 1)
			RETURNING id, url`,
    [userId, orderId || null, nowIso(), pool]
  );
}
__name(takeLink, "takeLink");
function createOrder(env2, order) {
  return one(
    env2,
    `INSERT INTO orders (user_id, kind, pool, plan_id, renew_service_id, amount, discount_code, discount_value, final_amount, method, status, created_at)
		 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`,
    [
      order.user_id,
      order.kind,
      order.pool || null,
      order.plan_id || null,
      order.renew_service_id || null,
      order.amount || 0,
      order.discount_code || null,
      order.discount_value || 0,
      order.final_amount || 0,
      order.method || null,
      order.status,
      nowIso()
    ]
  );
}
__name(createOrder, "createOrder");
function getOrder(env2, id) {
  return one(env2, `SELECT * FROM orders WHERE id = ?`, [id]);
}
__name(getOrder, "getOrder");
async function updateOrder(env2, id, fields) {
  const keys = Object.keys(fields);
  if (!keys.length) return getOrder(env2, id);
  const sql = `UPDATE orders SET ${keys.map((k) => `${k} = ?`).join(", ")} WHERE id = ?`;
  await run(env2, sql, [...keys.map((k) => fields[k]), id]);
  return getOrder(env2, id);
}
__name(updateOrder, "updateOrder");
function pendingStockOrders(env2, pool, planId) {
  if (planId) {
    return all(
      env2,
      `SELECT * FROM orders WHERE status = 'awaiting_stock' AND pool = ? AND plan_id = ? ORDER BY id`,
      [pool, planId]
    );
  }
  return all(env2, `SELECT * FROM orders WHERE status = 'awaiting_stock' AND pool = ? ORDER BY id`, [
    pool
  ]);
}
__name(pendingStockOrders, "pendingStockOrders");
function createService(env2, service) {
  return one(
    env2,
    `INSERT INTO services (user_id, order_id, link_id, url, pool, plan_id, plan_title, volume, days, is_trial, started_at, expires_at, status)
		 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active') RETURNING *`,
    [
      service.user_id,
      service.order_id || null,
      service.link_id || null,
      service.url,
      service.pool,
      service.plan_id || null,
      service.plan_title,
      service.volume,
      service.days,
      service.is_trial ? 1 : 0,
      service.started_at,
      service.expires_at
    ]
  );
}
__name(createService, "createService");
function listServices(env2, userId) {
  return all(env2, `SELECT * FROM services WHERE user_id = ? ORDER BY id DESC`, [userId]);
}
__name(listServices, "listServices");
function getService(env2, id, userId) {
  return one(env2, `SELECT * FROM services WHERE id = ? AND user_id = ?`, [id, userId]);
}
__name(getService, "getService");
function getServiceAdmin(env2, id) {
  return one(env2, `SELECT * FROM services WHERE id = ?`, [id]);
}
__name(getServiceAdmin, "getServiceAdmin");
function archiveService(env2, id) {
  return run(env2, `UPDATE services SET status = 'replaced' WHERE id = ?`, [id]);
}
__name(archiveService, "archiveService");
function deleteService(env2, id) {
  return run(env2, `UPDATE services SET status = 'deleted' WHERE id = ? AND status != 'deleted'`, [id]);
}
__name(deleteService, "deleteService");
function getCode(env2, code) {
  return one(env2, `SELECT * FROM codes WHERE code = ?`, [code]);
}
__name(getCode, "getCode");
function createCode(env2, code, kind, value, maxUses, adminId) {
  return run(
    env2,
    `INSERT INTO codes (code, kind, value, max_uses, used, active, created_by, created_at)
		 VALUES (?, ?, ?, ?, 0, 1, ?, ?)`,
    [code, kind, value, maxUses, adminId || null, nowIso()]
  );
}
__name(createCode, "createCode");
function listCodes(env2) {
  return all(env2, `SELECT * FROM codes ORDER BY created_at DESC LIMIT 30`);
}
__name(listCodes, "listCodes");
async function consumeCode(env2, code, userId, orderId) {
  const res = await run(
    env2,
    `UPDATE codes SET used = used + 1 WHERE code = ? AND active = 1 AND used < max_uses`,
    [code]
  );
  if (!changesOf(res)) return false;
  await run(
    env2,
    `INSERT INTO code_uses (code, user_id, order_id, created_at) VALUES (?, ?, ?, ?)`,
    [code, userId, orderId || null, nowIso()]
  );
  return true;
}
__name(consumeCode, "consumeCode");
async function releaseCode(env2, code, orderId) {
  await run(env2, `UPDATE codes SET used = MAX(used - 1, 0) WHERE code = ?`, [code]);
  if (orderId) await run(env2, `DELETE FROM code_uses WHERE order_id = ?`, [orderId]);
}
__name(releaseCode, "releaseCode");
async function codeUsedByUser(env2, code, userId) {
  const row = await one(env2, `SELECT COUNT(*) AS c FROM code_uses WHERE code = ? AND user_id = ?`, [
    code,
    userId
  ]);
  return (row ? row.c : 0) > 0;
}
__name(codeUsedByUser, "codeUsedByUser");
async function isDuplicateUpdate(env2, updateId) {
  if (updateId === void 0 || updateId === null) return false;
  const res = await run(
    env2,
    `INSERT OR IGNORE INTO seen_updates (update_id, created_at) VALUES (?, ?)`,
    [updateId, nowIso()]
  );
  return changesOf(res) === 0;
}
__name(isDuplicateUpdate, "isDuplicateUpdate");
function statsSummary(env2) {
  return one(
    env2,
    `SELECT
			(SELECT COUNT(*) FROM users) AS users,
			(SELECT COUNT(*) FROM users WHERE banned = 1) AS banned,
			(SELECT COUNT(*) FROM services WHERE is_trial = 0) AS services,
			(SELECT COUNT(*) FROM services WHERE is_trial = 1) AS trials,
			(SELECT COUNT(*) FROM links WHERE status = 'free') AS free_links,
			(SELECT IFNULL(SUM(final_amount), 0) FROM orders WHERE status = 'delivered') AS revenue`
  );
}
__name(statsSummary, "statsSummary");
function allUserIds(env2) {
  return all(env2, `SELECT id FROM users WHERE banned = 0`);
}
__name(allUserIds, "allUserIds");

// src/telegram.js
function apiUrl(env2, method) {
  return "https://api.telegram.org/bot" + env2.BOT_TOKEN + "/" + method;
}
__name(apiUrl, "apiUrl");
async function call(env2, method, payload = {}) {
  try {
    const res = await fetch(apiUrl(env2, method), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!data.ok) console.log("TG_ERROR", method, JSON.stringify(data));
    return data;
  } catch (err) {
    console.log("TG_FETCH_ERROR", method, String(err));
    return { ok: false };
  }
}
__name(call, "call");
function sendMessage(env2, chatId, text, extra = {}) {
  return call(env2, "sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
    ...extra
  });
}
__name(sendMessage, "sendMessage");
function answerCallback(env2, id, text = "", showAlert = false) {
  return call(env2, "answerCallbackQuery", {
    callback_query_id: id,
    text,
    show_alert: showAlert
  });
}
__name(answerCallback, "answerCallback");
function editMessageText(env2, chatId, messageId, text, extra = {}) {
  return call(env2, "editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
    ...extra
  });
}
__name(editMessageText, "editMessageText");
function editReplyMarkup(env2, chatId, messageId, replyMarkup) {
  return call(env2, "editMessageReplyMarkup", {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: replyMarkup || { inline_keyboard: [] }
  });
}
__name(editReplyMarkup, "editReplyMarkup");
function copyMessage(env2, chatId, fromChatId, messageId, extra = {}) {
  return call(env2, "copyMessage", {
    chat_id: chatId,
    from_chat_id: fromChatId,
    message_id: messageId,
    ...extra
  });
}
__name(copyMessage, "copyMessage");
async function sendPhotoBytes(env2, chatId, bytes, filename, caption) {
  const form = new FormData();
  form.append("chat_id", String(chatId));
  if (caption) {
    form.append("caption", caption);
    form.append("parse_mode", "HTML");
  }
  form.append("photo", new Blob([bytes], { type: "image/png" }), filename);
  try {
    const res = await fetch(apiUrl(env2, "sendPhoto"), { method: "POST", body: form });
    const data = await res.json();
    if (!data.ok) console.log("TG_ERROR sendPhoto", JSON.stringify(data));
    return data;
  } catch (err) {
    console.log("TG_FETCH_ERROR sendPhoto", String(err));
    return { ok: false };
  }
}
__name(sendPhotoBytes, "sendPhotoBytes");

// src/config.js
var LOCATIONS = {
  nl: { key: "nl", label: "\u{1F1F3}\u{1F1F1} \u0647\u0644\u0646\u062F (\u0633\u0631\u06CC\u0639)" },
  us: { key: "us", label: "\u{1F1FA}\u{1F1F8} \u0622\u0645\u0631\u06CC\u06A9\u0627 (\u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06CC)" }
};
var TRIAL = { pool: "trial", days: 1, volume: "\u06F1\u06F1\u06F0 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A", title: "\u0627\u06A9\u0627\u0646\u062A \u062A\u0633\u062A" };
var PLANS = [
  { id: "p1", pools: ["nl", "us"], days: 30, volume: "\u06F1\u06F5 \u06AF\u06CC\u06AF", price: 14e4, title: "\u06F1 \u0645\u0627\u0647\u0647 | \u06F1\u06F5 \u06AF\u06CC\u06AF" },
  { id: "p2", pools: ["nl", "us"], days: 30, volume: "\u06F3\u06F0 \u06AF\u06CC\u06AF", price: 32e4, title: "\u06F1 \u0645\u0627\u0647\u0647 | \u06F3\u06F0 \u06AF\u06CC\u06AF" },
  { id: "p3", pools: ["nl", "us"], days: 60, volume: "\u06F4\u06F5 \u06AF\u06CC\u06AF", price: 41e4, title: "\u06F2 \u0645\u0627\u0647\u0647 | \u06F4\u06F5 \u06AF\u06CC\u06AF" },
  { id: "p4", pools: ["us"], days: 30, volume: "\u0646\u0627\u0645\u062D\u062F\u0648\u062F", price: 58e4, title: "\u06F1 \u0645\u0627\u0647\u0647 | \u0646\u0627\u0645\u062D\u062F\u0648\u062F" }
];
function plansFor(pool) {
  return PLANS.filter((p) => p.pools.includes(pool));
}
__name(plansFor, "plansFor");
function planById(id) {
  return PLANS.find((p) => p.id === id) || null;
}
__name(planById, "planById");
function planLabel(plan) {
  return `${plan.title} | ${money(plan.price)} \u062A\u0648\u0645\u0627\u0646`;
}
__name(planLabel, "planLabel");
function planByLabel(pool, label) {
  return plansFor(pool).find((p) => planLabel(p) === label) || null;
}
__name(planByLabel, "planByLabel");
function poolKeyFor(pool, planId) {
  if (pool === TRIAL.pool || !planId) return TRIAL.pool;
  return `${pool}:${planId}`;
}
__name(poolKeyFor, "poolKeyFor");
function parsePoolKey(key) {
  if (key === TRIAL.pool) return { pool: TRIAL.pool, planId: null };
  const [pool, planId] = String(key).split(":");
  return { pool, planId: planId || null };
}
__name(parsePoolKey, "parsePoolKey");
function poolKeyLabel(key) {
  const { pool, planId } = parsePoolKey(key);
  if (pool === TRIAL.pool) return `\u{1F381} ${TRIAL.title} (${TRIAL.volume})`;
  const loc = LOCATIONS[pool] ? LOCATIONS[pool].label : pool;
  const plan = planById(planId);
  return plan ? `${loc} \u2014 ${plan.title}` : loc;
}
__name(poolKeyLabel, "poolKeyLabel");
function allPoolKeys() {
  const keys = [];
  for (const loc of Object.values(LOCATIONS)) {
    for (const plan of plansFor(loc.key)) keys.push(poolKeyFor(loc.key, plan.id));
  }
  keys.push(TRIAL.pool);
  return keys;
}
__name(allPoolKeys, "allPoolKeys");
var FA_DIGITS = ["\u06F0", "\u06F1", "\u06F2", "\u06F3", "\u06F4", "\u06F5", "\u06F6", "\u06F7", "\u06F8", "\u06F9"];
function toFa(input) {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}
__name(toFa, "toFa");
function toEnDigits(input) {
  return String(input).replace(/[\u06f0-\u06f9]/g, (d) => String(d.charCodeAt(0) - 1776)).replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 1632));
}
__name(toEnDigits, "toEnDigits");
function money(n) {
  return toFa(Number(n || 0).toLocaleString("en-US"));
}
__name(money, "money");
function parseAmount(text) {
  const cleaned = toEnDigits(text).replace(/[,\s،_]/g, "");
  if (!/^\d+$/.test(cleaned)) return null;
  return Number(cleaned);
}
__name(parseAmount, "parseAmount");
function escapeHtml(text) {
  return String(text === null || text === void 0 ? "" : text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
__name(escapeHtml, "escapeHtml");
var BTN = {
  buy: "\u{1F6D2} \u062E\u0631\u06CC\u062F \u0633\u0631\u0648\u06CC\u0633 \u062C\u062F\u06CC\u062F",
  myServices: "\u{1F4E6} \u0633\u0631\u0648\u06CC\u0633\u200C\u0647\u0627\u06CC \u0645\u0646",
  renew: "\u{1F504} \u062A\u0645\u062F\u06CC\u062F \u0633\u0631\u0648\u06CC\u0633",
  account: "\u{1F464} \u062D\u0633\u0627\u0628 \u0645\u0646",
  trial: "\u{1F381} \u0627\u06A9\u0627\u0646\u062A \u062A\u0633\u062A",
  support: "\u{1F4AC} \u062A\u0645\u0627\u0633 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
  adminPanel: "\u{1F6E0} \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A",
  back: "\u{1F519} \u0628\u0627\u0632\u06AF\u0634\u062A",
  home: "\u{1F3E0} \u0645\u0646\u0648\u06CC \u0627\u0635\u0644\u06CC",
  cancel: "\u274C \u0627\u0646\u0635\u0631\u0627\u0641",
  payCard: "\u{1F4B3} \u06A9\u0627\u0631\u062A \u0628\u0647 \u06A9\u0627\u0631\u062A",
  payDiscount: "\u{1F39F} \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 \u06A9\u062F \u062A\u062E\u0641\u06CC\u0641",
  payWallet: "\u{1F45B} \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644",
  topup: "\u2795 \u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644",
  gift: "\u{1F381} \u062B\u0628\u062A \u06A9\u062F \u0647\u062F\u06CC\u0647",
  txHistory: "\u{1F9FE} \u062A\u0631\u0627\u06A9\u0646\u0634\u200C\u0647\u0627\u06CC \u0645\u0646",
  aAddLinks: "\u2795 \u0627\u0641\u0632\u0648\u062F\u0646 \u0644\u06CC\u0646\u06A9",
  aStock: "\u{1F4CA} \u0645\u0648\u062C\u0648\u062F\u06CC \u0644\u06CC\u0646\u06A9\u200C\u0647\u0627",
  aMakeCode: "\u{1F39F} \u0633\u0627\u062E\u062A \u06A9\u062F",
  aListCodes: "\u{1F4CB} \u0644\u06CC\u0633\u062A \u06A9\u062F\u0647\u0627",
  aSetCard: "\u{1F4B3} \u062A\u0646\u0638\u06CC\u0645 \u0634\u0645\u0627\u0631\u0647 \u06A9\u0627\u0631\u062A",
  aUsers: "\u{1F465} \u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
  aDeleteService: "\u{1F5D1} \u062D\u0630\u0641 \u0633\u0631\u0648\u06CC\u0633 \u06A9\u0627\u0631\u0628\u0631",
  aWallet: "\u{1F4B0} \u0634\u0627\u0631\u0698 \u062F\u0633\u062A\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644",
  aStats: "\u{1F4C8} \u0622\u0645\u0627\u0631 \u0631\u0628\u0627\u062A",
  aBroadcast: "\u{1F4E3} \u067E\u06CC\u0627\u0645 \u0647\u0645\u06AF\u0627\u0646\u06CC"
};
function keyboard(rows) {
  return {
    keyboard: rows.map((row) => row.map((text) => ({ text }))),
    resize_keyboard: true,
    is_persistent: true
  };
}
__name(keyboard, "keyboard");
function mainKeyboard(isAdmin2) {
  const rows = [
    [BTN.buy, BTN.myServices],
    [BTN.renew, BTN.account],
    [BTN.trial, BTN.support]
  ];
  if (isAdmin2) rows.push([BTN.adminPanel]);
  return keyboard(rows);
}
__name(mainKeyboard, "mainKeyboard");
function adminKeyboard() {
  return keyboard([
    [BTN.aAddLinks, BTN.aStock],
    [BTN.aMakeCode, BTN.aListCodes],
    [BTN.aSetCard, BTN.aWallet],
    [BTN.aUsers, BTN.aDeleteService],
    [BTN.aStats],
    [BTN.aBroadcast],
    [BTN.home]
  ]);
}
__name(adminKeyboard, "adminKeyboard");
var TEXTS = {
  welcome: /* @__PURE__ */ __name((name) => `\u0633\u0644\u0627\u0645 ${escapeHtml(name || "\u062F\u0648\u0633\u062A \u0639\u0632\u06CC\u0632")} \u{1F44B}
\u0628\u0647 \u0631\u0628\u0627\u062A \u0641\u0631\u0648\u0634 \u0633\u0631\u0648\u06CC\u0633 \u062E\u0648\u0634 \u0627\u0648\u0645\u062F\u06CC.
\u06CC\u06A9\u06CC \u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u0647\u0627\u06CC \u067E\u0627\u06CC\u06CC\u0646 \u0635\u0641\u062D\u0647 \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u{1F447}`, "welcome"),
  mainMenu: "\u0645\u0646\u0648\u06CC \u0627\u0635\u0644\u06CC \u062E\u062F\u0645\u062A \u0634\u0645\u0627 \u{1F447}",
  banned: "\u26D4\uFE0F \u062F\u0633\u062A\u0631\u0633\u06CC \u0634\u0645\u0627 \u0628\u0647 \u0631\u0628\u0627\u062A \u0645\u0633\u062F\u0648\u062F \u0634\u062F\u0647 \u0627\u0633\u062A.",
  unknown: "\u0645\u062A\u0648\u062C\u0647 \u0646\u0634\u062F\u0645 \u{1F64F} \u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u0647\u0627\u06CC \u067E\u0627\u06CC\u06CC\u0646 \u0635\u0641\u062D\u0647 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.",
  volumeSoon: "\u06AF\u0632\u0627\u0631\u0634 \u062D\u062C\u0645 \u0645\u0635\u0631\u0641\u06CC \u0628\u0647\u200C\u0632\u0648\u062F\u06CC \u0641\u0639\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F"
};
var PLATFORMS = [
  { id: "android", label: "\u{1F916} \u0627\u0646\u062F\u0631\u0648\u06CC\u062F" },
  { id: "ios", label: "\u{1F34E} \u0622\u06CC\u0641\u0648\u0646 / \u0622\u06CC\u067E\u062F" },
  { id: "windows", label: "\u{1F5A5} \u0648\u06CC\u0646\u062F\u0648\u0632" },
  { id: "mac", label: "\u{1F4BB} \u0645\u06A9" }
];
function guideKeyboard(serviceId) {
  return {
    inline_keyboard: [
      [
        { text: PLATFORMS[0].label, callback_data: `hlp:android:${serviceId}` },
        { text: PLATFORMS[1].label, callback_data: `hlp:ios:${serviceId}` }
      ],
      [
        { text: PLATFORMS[2].label, callback_data: `hlp:windows:${serviceId}` },
        { text: PLATFORMS[3].label, callback_data: `hlp:mac:${serviceId}` }
      ]
    ]
  };
}
__name(guideKeyboard, "guideKeyboard");
function guideBackKeyboard(serviceId) {
  return {
    inline_keyboard: [
      [{ text: "\u{1F519} \u0627\u0646\u062A\u062E\u0627\u0628 \u062F\u0633\u062A\u06AF\u0627\u0647 \u062F\u06CC\u06AF\u0631", callback_data: `hlp:menu:${serviceId}` }],
      [{ text: "\u{1F533} \u062F\u0631\u06CC\u0627\u0641\u062A \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC QR", callback_data: `hlp:qr:${serviceId}` }]
    ]
  };
}
__name(guideBackKeyboard, "guideBackKeyboard");
var GUIDE_INTRO = "\u{1F4DA} <b>\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u0627\u062A\u0635\u0627\u0644</b>\n\u062F\u0633\u062A\u06AF\u0627\u0647\u062A \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u062A\u0627 \u0642\u062F\u0645 \u0628\u0647 \u0642\u062F\u0645 \u0628\u0647\u062A \u06CC\u0627\u062F \u0628\u062F\u0645 \u{1F447}";
var GUIDE_BODIES = {
  android: [
    "\u{1F916} <b>\u0622\u0645\u0648\u0632\u0634 \u0627\u062A\u0635\u0627\u0644 \u062F\u0631 \u0627\u0646\u062F\u0631\u0648\u06CC\u062F</b>",
    "",
    "<b>\u06F1\uFE0F\u20E3 \u0646\u0635\u0628 \u0628\u0631\u0646\u0627\u0645\u0647</b>",
    "\u0628\u0631\u0646\u0627\u0645\u0647\u200C\u06CC <b>v2rayNG</b> \u0631\u0648 \u0627\u0632 \u06AF\u0648\u06AF\u0644 \u067E\u0644\u06CC \u06CC\u0627 \u06AF\u06CC\u062A\u200C\u0647\u0627\u0628 \u0646\u0635\u0628 \u06A9\u0646:",
    "\u{1F517} github.com/2dust/v2rayNG/releases",
    "(\u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC \u062F\u06CC\u06AF\u0631: <b>NekoBox</b> \u06CC\u0627 <b>Hiddify</b>)",
    "",
    "<b>\u06F2\uFE0F\u20E3 \u06A9\u067E\u06CC \u06A9\u0631\u062F\u0646 \u0644\u06CC\u0646\u06A9</b>",
    "\u0631\u0648\u06CC \u0644\u06CC\u0646\u06A9 \u0628\u0627\u0644\u0627 \u06CC\u06A9 \u0628\u0627\u0631 \u0628\u0632\u0646 \u062A\u0627 \u062E\u0648\u062F\u06A9\u0627\u0631 \u06A9\u067E\u06CC \u0628\u0634\u0647.",
    "",
    "<b>\u06F3\uFE0F\u20E3 \u0627\u0641\u0632\u0648\u062F\u0646 \u06A9\u0627\u0646\u0641\u06CC\u06AF</b>",
    "\u062F\u0631 v2rayNG \u0631\u0648\u06CC \u0639\u0644\u0627\u0645\u062A <b>+</b> \u06AF\u0648\u0634\u0647\u200C\u06CC \u0628\u0627\u0644\u0627 \u0628\u0632\u0646 \u2190 <b>Import config from Clipboard</b>",
    "\u06CC\u0627 \u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC <b>Scan QR code</b> \u0631\u0648 \u0628\u0632\u0646 \u0648 \u0639\u06A9\u0633 QR \u0631\u0648 \u0627\u0633\u06A9\u0646 \u06A9\u0646.",
    "",
    "<b>\u06F4\uFE0F\u20E3 \u0627\u062A\u0635\u0627\u0644</b>",
    "\u06A9\u0627\u0646\u0641\u06CC\u06AF \u062C\u062F\u06CC\u062F \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u0648 \u062F\u06A9\u0645\u0647\u200C\u06CC \u06AF\u0631\u062F \u067E\u0627\u06CC\u06CC\u0646 \u0635\u0641\u062D\u0647 (V) \u0631\u0648 \u0628\u0632\u0646.",
    "\u0628\u0627\u0631 \u0627\u0648\u0644 \u067E\u06CC\u0627\u0645 \u062F\u0633\u062A\u0631\u0633\u06CC VPN \u0645\u06CC\u0627\u062F \u2190 <b>OK</b> \u0631\u0648 \u0628\u0632\u0646.",
    "",
    "\u2705 \u0648\u0642\u062A\u06CC \u0622\u06CC\u06A9\u0648\u0646 \u06A9\u0644\u06CC\u062F \u{1F511} \u062F\u0631 \u0646\u0648\u0627\u0631 \u0628\u0627\u0644\u0627\u06CC \u06AF\u0648\u0634\u06CC \u0638\u0627\u0647\u0631 \u0634\u062F\u060C \u0648\u0635\u0644\u06CC!"
  ],
  ios: [
    "\u{1F34E} <b>\u0622\u0645\u0648\u0632\u0634 \u0627\u062A\u0635\u0627\u0644 \u062F\u0631 \u0622\u06CC\u0641\u0648\u0646 / \u0622\u06CC\u067E\u062F</b>",
    "",
    "<b>\u06F1\uFE0F\u20E3 \u0646\u0635\u0628 \u0628\u0631\u0646\u0627\u0645\u0647</b>",
    "\u0627\u0632 App Store \u06CC\u06A9\u06CC \u0627\u0632 \u0627\u06CC\u0646\u0627 \u0631\u0648 \u0646\u0635\u0628 \u06A9\u0646:",
    "\u2022 <b>Streisand</b> (\u0631\u0627\u06CC\u06AF\u0627\u0646 \u0648 \u0633\u0627\u062F\u0647)",
    "\u2022 <b>V2Box</b> \u06CC\u0627 <b>Shadowrocket</b>",
    "\u26A0\uFE0F \u0627\u06AF\u0631 \u062F\u0631 \u0627\u0633\u062A\u0648\u0631 \u0627\u06CC\u0631\u0627\u0646 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F\u060C \u0627\u067E\u0644\u200C\u0622\u06CC\u062F\u06CC \u062E\u0627\u0631\u062C\u06CC (\u0645\u062B\u0644\u0627\u064B \u0622\u0645\u0631\u06CC\u06A9\u0627) \u0644\u0627\u0632\u0645\u0647.",
    "",
    "<b>\u06F2\uFE0F\u20E3 \u06A9\u067E\u06CC \u06A9\u0631\u062F\u0646 \u0644\u06CC\u0646\u06A9</b>",
    "\u0631\u0648\u06CC \u0644\u06CC\u0646\u06A9 \u0628\u0627\u0644\u0627 \u0628\u0632\u0646 \u062A\u0627 \u06A9\u067E\u06CC \u0628\u0634\u0647.",
    "",
    "<b>\u06F3\uFE0F\u20E3 \u0627\u0641\u0632\u0648\u062F\u0646 \u06A9\u0627\u0646\u0641\u06CC\u06AF</b>",
    "\u062F\u0631 Streisand: \u0639\u0644\u0627\u0645\u062A <b>+</b> \u0628\u0627\u0644\u0627 \u0633\u0645\u062A \u0631\u0627\u0633\u062A \u2190 <b>Import from Clipboard</b>",
    "\u062F\u0631 V2Box: \u062A\u0628 <b>Configs</b> \u2190 <b>+</b> \u2190 <b>Import v2ray uri from clipboard</b>",
    "\u06CC\u0627 \u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC \u0627\u0633\u06A9\u0646 QR \u0631\u0648 \u0628\u0632\u0646 \u0648 \u0639\u06A9\u0633 \u0628\u0627\u0644\u0627 \u0631\u0648 \u0627\u0633\u06A9\u0646 \u06A9\u0646.",
    "",
    "<b>\u06F4\uFE0F\u20E3 \u0627\u062A\u0635\u0627\u0644</b>",
    "\u06A9\u0627\u0646\u0641\u06CC\u06AF \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u0648 \u06A9\u0644\u06CC\u062F \u0627\u062A\u0635\u0627\u0644 \u0631\u0648 \u0628\u0632\u0646.",
    "\u0628\u0627\u0631 \u0627\u0648\u0644 \u067E\u06CC\u0627\u0645 <b>Allow / \u0627\u062C\u0627\u0632\u0647</b> \u0645\u06CC\u0627\u062F \u2190 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646 (\u0631\u0645\u0632 \u06CC\u0627 Face ID \u0645\u06CC\u200C\u062E\u0648\u0627\u062F).",
    "",
    "\u2705 \u0646\u0648\u0634\u062A\u0647\u200C\u06CC VPN \u062F\u0631 \u0646\u0648\u0627\u0631 \u0628\u0627\u0644\u0627\u06CC \u0635\u0641\u062D\u0647 \u06CC\u0639\u0646\u06CC \u0648\u0635\u0644\u06CC!"
  ],
  windows: [
    "\u{1F5A5} <b>\u0622\u0645\u0648\u0632\u0634 \u0627\u062A\u0635\u0627\u0644 \u062F\u0631 \u0648\u06CC\u0646\u062F\u0648\u0632</b>",
    "",
    "<b>\u06F1\uFE0F\u20E3 \u0646\u0635\u0628 \u0628\u0631\u0646\u0627\u0645\u0647</b>",
    "\u0628\u0631\u0646\u0627\u0645\u0647\u200C\u06CC <b>v2rayN</b> \u0631\u0648 \u062F\u0627\u0646\u0644\u0648\u062F \u06A9\u0646:",
    "\u{1F517} github.com/2dust/v2rayN/releases",
    "\u0641\u0627\u06CC\u0644 zip \u0631\u0648 \u0627\u06A9\u0633\u062A\u0631\u06A9\u062A \u06A9\u0646 \u0648 <b>v2rayN.exe</b> \u0631\u0648 \u0627\u062C\u0631\u0627 \u06A9\u0646.",
    "(\u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC \u0633\u0627\u062F\u0647\u200C\u062A\u0631: <b>Hiddify Desktop</b>)",
    "\u26A0\uFE0F \u0627\u06AF\u0631 \u0622\u0646\u062A\u06CC\u200C\u0648\u06CC\u0631\u0648\u0633 \u06AF\u06CC\u0631 \u062F\u0627\u062F\u060C \u067E\u0648\u0634\u0647 \u0631\u0648 \u062F\u0631 Exclusions \u0642\u0631\u0627\u0631 \u0628\u062F\u0647.",
    "",
    "<b>\u06F2\uFE0F\u20E3 \u06A9\u067E\u06CC \u06A9\u0631\u062F\u0646 \u0644\u06CC\u0646\u06A9</b>",
    "\u0644\u06CC\u0646\u06A9 \u0628\u0627\u0644\u0627 \u0631\u0648 \u06A9\u067E\u06CC \u06A9\u0646 (\u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645 \u062F\u0633\u06A9\u062A\u0627\u067E \u0631\u0648\u06CC \u0645\u062A\u0646 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646).",
    "",
    "<b>\u06F3\uFE0F\u20E3 \u0627\u0641\u0632\u0648\u062F\u0646 \u06A9\u0627\u0646\u0641\u06CC\u06AF</b>",
    "\u062F\u0631 v2rayN \u06A9\u0644\u06CC\u062F\u0647\u0627\u06CC <b>Ctrl + V</b> \u0631\u0648 \u0628\u0632\u0646 (\u0648\u0627\u0631\u062F \u06A9\u0631\u062F\u0646 \u0627\u0632 \u06A9\u0644\u06CC\u067E\u200C\u0628\u0648\u0631\u062F)",
    "\u06CC\u0627 \u0627\u0632 \u0645\u0646\u0648\u06CC <b>Servers \u2190 Import bulk URL from clipboard</b>.",
    "",
    "<b>\u06F4\uFE0F\u20E3 \u062A\u0646\u0638\u06CC\u0645 \u062D\u0627\u0644\u062A \u0633\u06CC\u0633\u062A\u0645\u06CC</b>",
    "\u0631\u0648\u06CC \u0622\u06CC\u06A9\u0648\u0646 v2rayN \u06A9\u0646\u0627\u0631 \u0633\u0627\u0639\u062A \u0631\u0627\u0633\u062A\u200C\u06A9\u0644\u06CC\u06A9 \u06A9\u0646 \u2190 \u0642\u0633\u0645\u062A <b>System Proxy</b> \u2190 \u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC <b>Set system proxy</b>.",
    "",
    "<b>\u06F5\uFE0F\u20E3 \u0627\u062A\u0635\u0627\u0644</b>",
    "\u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u062F\u0648\u0628\u0627\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646 \u062A\u0627 \u0641\u0639\u0627\u0644 \u0628\u0634\u0647\u061B \u062A\u0645\u0648\u0645!",
    "",
    "\u2705 \u062A\u0633\u062A: \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u0639\u0628\u0627\u0631\u062A <code>my ip</code> \u0631\u0648 \u0633\u0631\u0686 \u06A9\u0646\u061B \u0628\u0627\u06CC\u062F \u06A9\u0634\u0648\u0631 \u062E\u0627\u0631\u062C\u06CC \u0646\u0634\u0648\u0646 \u0628\u062F\u0647."
  ],
  mac: [
    "\u{1F4BB} <b>\u0622\u0645\u0648\u0632\u0634 \u0627\u062A\u0635\u0627\u0644 \u062F\u0631 \u0645\u06A9 (macOS)</b>",
    "",
    "<b>\u06F1\uFE0F\u20E3 \u0646\u0635\u0628 \u0628\u0631\u0646\u0627\u0645\u0647</b>",
    "\u06CC\u06A9\u06CC \u0627\u0632 \u0627\u06CC\u0646\u0627 \u0631\u0648 \u0646\u0635\u0628 \u06A9\u0646:",
    "\u2022 <b>V2Box</b> \u06CC\u0627 <b>Streisand</b> \u0627\u0632 App Store",
    "\u2022 \u06CC\u0627 <b>V2RayXS</b> / <b>Hiddify</b> \u0627\u0632 \u06AF\u06CC\u062A\u200C\u0647\u0627\u0628",
    "",
    "<b>\u06F2\uFE0F\u20E3 \u06A9\u067E\u06CC \u06A9\u0631\u062F\u0646 \u0644\u06CC\u0646\u06A9</b>",
    "\u0644\u06CC\u0646\u06A9 \u0628\u0627\u0644\u0627 \u0631\u0648 \u06A9\u067E\u06CC \u06A9\u0646 (Command + C).",
    "",
    "<b>\u06F3\uFE0F\u20E3 \u0627\u0641\u0632\u0648\u062F\u0646 \u06A9\u0627\u0646\u0641\u06CC\u06AF</b>",
    "\u062F\u0631 \u0628\u0631\u0646\u0627\u0645\u0647 \u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC <b>Import from Clipboard</b> \u0631\u0648 \u0628\u0632\u0646.",
    "\u062F\u0631 V2RayXS: \u0645\u0646\u0648\u06CC \u0628\u0627\u0644\u0627\u06CC \u0635\u0641\u062D\u0647 \u2190 <b>Import from pasteboard</b>.",
    "",
    "<b>\u06F4\uFE0F\u20E3 \u0627\u062A\u0635\u0627\u0644</b>",
    "\u0633\u0631\u0648\u0631 \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u0648 \u06A9\u0644\u06CC\u062F \u0627\u062A\u0635\u0627\u0644 \u0631\u0648 \u0628\u0632\u0646.",
    "\u062F\u0631 \u0635\u0648\u0631\u062A \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0631\u0645\u0632 \u0645\u06A9\u060C \u0631\u0645\u0632 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0631\u0648 \u0648\u0627\u0631\u062F \u06A9\u0646.",
    "",
    "\u2705 \u0622\u06CC\u06A9\u0648\u0646 \u0628\u0631\u0646\u0627\u0645\u0647 \u062F\u0631 \u0646\u0648\u0627\u0631 \u0628\u0627\u0644\u0627 \u0633\u0628\u0632/\u0641\u0639\u0627\u0644 \u0634\u062F \u06CC\u0639\u0646\u06CC \u0648\u0635\u0644\u06CC!"
  ]
};
var GUIDE_TIPS = [
  "",
  "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014",
  "\u{1F4A1} <b>\u0646\u06A9\u0627\u062A \u0645\u0647\u0645</b>",
  "\u2022 \u0627\u06AF\u0631 \u0648\u0635\u0644 \u0634\u062F \u0648\u0644\u06CC \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0628\u0627\u0644\u0627 \u0646\u06CC\u0648\u0645\u062F\u060C \u06CC\u06A9 \u0628\u0627\u0631 \u0642\u0637\u0639 \u0648 \u0648\u0635\u0644 \u06A9\u0646 \u06CC\u0627 \u0628\u06CC\u0646 \u062F\u06CC\u062A\u0627\u06CC \u0647\u0645\u0631\u0627\u0647 \u0648 \u0648\u0627\u06CC\u200C\u0641\u0627\u06CC \u062C\u0627\u0628\u0647\u200C\u062C\u0627 \u0634\u0648.",
  "\u2022 \u0633\u0627\u0639\u062A \u0648 \u062A\u0627\u0631\u06CC\u062E \u062F\u0633\u062A\u06AF\u0627\u0647\u062A \u062D\u062A\u0645\u0627\u064B \u0631\u0648\u06CC \u062D\u0627\u0644\u062A \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u0627\u0634\u0647\u061B \u0648\u06AF\u0631\u0646\u0647 \u0627\u062A\u0635\u0627\u0644 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0645\u06CC\u200C\u0634\u0647.",
  "\u2022 \u0644\u06CC\u0646\u06A9\u062A \u0631\u0648 \u0628\u0631\u0627\u06CC \u06A9\u0633\u06CC \u0646\u0641\u0631\u0633\u062A\u061B \u0627\u06CC\u0646 \u0644\u06CC\u0646\u06A9 \u0641\u0642\u0637 \u0645\u062E\u0635\u0648\u0635 \u062E\u0648\u062F\u062A \u0627\u0633\u062A.",
  "\u2022 \u0647\u0631 \u0645\u0634\u06A9\u0644\u06CC \u0628\u0648\u062F\u060C \u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u06CC \xAB\u{1F4AC} \u062A\u0645\u0627\u0633 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC\xBB \u067E\u06CC\u0627\u0645 \u0628\u062F\u0647."
].join("\n");
function guideText(platform2, url) {
  const body = GUIDE_BODIES[platform2];
  if (!body) return null;
  return `\u{1F517} <b>\u0644\u06CC\u0646\u06A9 \u0627\u062A\u0635\u0627\u0644 \u0634\u0645\u0627</b> (\u0628\u0631\u0627\u06CC \u06A9\u067E\u06CC \u0631\u0648\u06CC \u0622\u0646 \u0628\u0632\u0646\u06CC\u062F)
<code>${escapeHtml(url)}</code>

` + body.join("\n") + "\n" + GUIDE_TIPS;
}
__name(guideText, "guideText");

// src/qr.js
var ECC = { L: 0, M: 1, Q: 2, H: 3 };
var ECC_FORMAT_BITS = [1, 0, 3, 2];
var ECC_CODEWORDS_PER_BLOCK = [
  [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
  [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
];
var NUM_ECC_BLOCKS = [
  [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
  [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
  [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
  [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
];
function getNumRawDataModules(ver) {
  let result = (16 * ver + 128) * ver + 64;
  if (ver >= 2) {
    const numAlign = Math.floor(ver / 7) + 2;
    result -= (25 * numAlign - 10) * numAlign - 55;
    if (ver >= 7) result -= 36;
  }
  return result;
}
__name(getNumRawDataModules, "getNumRawDataModules");
function getNumDataCodewords(ver, ecl) {
  return Math.floor(getNumRawDataModules(ver) / 8) - ECC_CODEWORDS_PER_BLOCK[ecl][ver] * NUM_ECC_BLOCKS[ecl][ver];
}
__name(getNumDataCodewords, "getNumDataCodewords");
function gfMul(x, y) {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = z << 1 ^ (z >>> 7) * 285;
    z ^= (y >>> i & 1) * x;
  }
  return z & 255;
}
__name(gfMul, "gfMul");
function reedSolomonDivisor(degree) {
  const result = new Uint8Array(degree);
  result[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      result[j] = gfMul(result[j], root);
      if (j + 1 < degree) result[j] ^= result[j + 1];
    }
    root = gfMul(root, 2);
  }
  return result;
}
__name(reedSolomonDivisor, "reedSolomonDivisor");
function reedSolomonRemainder(data, divisor) {
  const result = new Uint8Array(divisor.length);
  for (const b of data) {
    const factor = b ^ result[0];
    result.copyWithin(0, 1);
    result[result.length - 1] = 0;
    for (let i = 0; i < divisor.length; i++) result[i] ^= gfMul(divisor[i], factor);
  }
  return result;
}
__name(reedSolomonRemainder, "reedSolomonRemainder");
function buildDataCodewords(bytes, ver, ecl) {
  const bits = [];
  const push = /* @__PURE__ */ __name((val, len) => {
    for (let i = len - 1; i >= 0; i--) bits.push(val >>> i & 1);
  }, "push");
  push(4, 4);
  push(bytes.length, ver <= 9 ? 8 : 16);
  for (const b of bytes) push(b, 8);
  const capacityBits = getNumDataCodewords(ver, ecl) * 8;
  if (bits.length > capacityBits) return null;
  push(0, Math.min(4, capacityBits - bits.length));
  push(0, (8 - bits.length % 8) % 8);
  for (let pad = 236; bits.length < capacityBits; pad ^= 236 ^ 17) push(pad, 8);
  const out = new Uint8Array(bits.length / 8);
  bits.forEach((bit, i) => {
    out[i >>> 3] |= bit << 7 - (i & 7);
  });
  return out;
}
__name(buildDataCodewords, "buildDataCodewords");
function addEccAndInterleave(data, ver, ecl) {
  const numBlocks = NUM_ECC_BLOCKS[ecl][ver];
  const blockEccLen = ECC_CODEWORDS_PER_BLOCK[ecl][ver];
  const rawCodewords = Math.floor(getNumRawDataModules(ver) / 8);
  const numShortBlocks = numBlocks - rawCodewords % numBlocks;
  const shortBlockLen = Math.floor(rawCodewords / numBlocks);
  const rsDiv = reedSolomonDivisor(blockEccLen);
  const blocks = [];
  for (let i = 0, k = 0; i < numBlocks; i++) {
    const isShort = i < numShortBlocks;
    const datLen = shortBlockLen - blockEccLen + (isShort ? 0 : 1);
    const dat = data.slice(k, k + datLen);
    k += datLen;
    const ecc = reedSolomonRemainder(dat, rsDiv);
    const block = new Uint8Array(shortBlockLen + 1);
    block.set(dat, 0);
    block.set(ecc, datLen + (isShort ? 1 : 0));
    blocks.push(block);
  }
  const result = new Uint8Array(rawCodewords);
  let idx = 0;
  for (let i = 0; i <= shortBlockLen; i++) {
    for (let j = 0; j < numBlocks; j++) {
      if (i !== shortBlockLen - blockEccLen || j >= numShortBlocks) {
        result[idx++] = blocks[j][i];
      }
    }
  }
  return result;
}
__name(addEccAndInterleave, "addEccAndInterleave");
var QrMatrix = class {
  static {
    __name(this, "QrMatrix");
  }
  constructor(ver, ecl) {
    this.ver = ver;
    this.ecl = ecl;
    this.size = ver * 4 + 17;
    this.modules = Array.from({ length: this.size }, () => new Array(this.size).fill(false));
    this.isFunction = Array.from({ length: this.size }, () => new Array(this.size).fill(false));
  }
  setFn(x, y, dark) {
    this.modules[y][x] = dark;
    this.isFunction[y][x] = true;
  }
  drawFinder(x, y) {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const dist = Math.max(Math.abs(dx), Math.abs(dy));
        const xx = x + dx;
        const yy = y + dy;
        if (xx >= 0 && xx < this.size && yy >= 0 && yy < this.size) {
          this.setFn(xx, yy, dist !== 2 && dist !== 4);
        }
      }
    }
  }
  drawAlignment(x, y) {
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        this.setFn(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
      }
    }
  }
  alignPositions() {
    if (this.ver === 1) return [];
    const numAlign = Math.floor(this.ver / 7) + 2;
    const step = Math.floor((this.ver * 8 + numAlign * 3 + 5) / (numAlign * 4 - 4)) * 2;
    const result = [6];
    for (let pos = this.size - 7; result.length < numAlign; pos -= step) result.splice(1, 0, pos);
    return result;
  }
  drawFormatBits(mask) {
    const data = ECC_FORMAT_BITS[this.ecl] << 3 | mask;
    let rem = data;
    for (let i = 0; i < 10; i++) rem = rem << 1 ^ (rem >>> 9) * 1335;
    const bits = (data << 10 | rem) ^ 21522;
    const get = /* @__PURE__ */ __name((i) => (bits >>> i & 1) !== 0, "get");
    for (let i = 0; i <= 5; i++) this.setFn(8, i, get(i));
    this.setFn(8, 7, get(6));
    this.setFn(8, 8, get(7));
    this.setFn(7, 8, get(8));
    for (let i = 9; i < 15; i++) this.setFn(14 - i, 8, get(i));
    for (let i = 0; i < 8; i++) this.setFn(this.size - 1 - i, 8, get(i));
    for (let i = 8; i < 15; i++) this.setFn(8, this.size - 15 + i, get(i));
    this.setFn(8, this.size - 8, true);
  }
  drawVersion() {
    if (this.ver < 7) return;
    let rem = this.ver;
    for (let i = 0; i < 12; i++) rem = rem << 1 ^ (rem >>> 11) * 7973;
    const bits = this.ver << 12 | rem;
    for (let i = 0; i < 18; i++) {
      const bit = (bits >>> i & 1) !== 0;
      const a = this.size - 11 + i % 3;
      const b = Math.floor(i / 3);
      this.setFn(a, b, bit);
      this.setFn(b, a, bit);
    }
  }
  drawFunctionPatterns() {
    for (let i = 0; i < this.size; i++) {
      this.setFn(6, i, i % 2 === 0);
      this.setFn(i, 6, i % 2 === 0);
    }
    this.drawFinder(3, 3);
    this.drawFinder(this.size - 4, 3);
    this.drawFinder(3, this.size - 4);
    const pos = this.alignPositions();
    const n = pos.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === 0 && j === 0 || i === 0 && j === n - 1 || i === n - 1 && j === 0) continue;
        this.drawAlignment(pos[i], pos[j]);
      }
    }
    this.drawFormatBits(0);
    this.drawVersion();
  }
  drawCodewords(data) {
    let i = 0;
    for (let right = this.size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < this.size; vert++) {
        for (let j = 0; j < 2; j++) {
          const x = right - j;
          const upward = (right + 1 & 2) === 0;
          const y = upward ? this.size - 1 - vert : vert;
          if (!this.isFunction[y][x] && i < data.length * 8) {
            this.modules[y][x] = (data[i >>> 3] >>> 7 - (i & 7) & 1) !== 0;
            i++;
          }
        }
      }
    }
  }
  applyMask(mask) {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.isFunction[y][x]) continue;
        let invert = false;
        if (mask === 0) invert = (x + y) % 2 === 0;
        else if (mask === 1) invert = y % 2 === 0;
        else if (mask === 2) invert = x % 3 === 0;
        else if (mask === 3) invert = (x + y) % 3 === 0;
        else if (mask === 4) invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0;
        else if (mask === 5) invert = x * y % 2 + x * y % 3 === 0;
        else if (mask === 6) invert = (x * y % 2 + x * y % 3) % 2 === 0;
        else if (mask === 7) invert = ((x + y) % 2 + x * y % 3) % 2 === 0;
        if (invert) this.modules[y][x] = !this.modules[y][x];
      }
    }
  }
  penalty() {
    const size = this.size;
    const N1 = 3;
    const N2 = 3;
    const N3 = 40;
    const N4 = 10;
    let result = 0;
    for (let y = 0; y < size; y++) {
      let color = false;
      let run2 = 0;
      const hist = new Array(7).fill(0);
      for (let x = 0; x < size; x++) {
        if (this.modules[y][x] === color) {
          run2++;
          if (run2 === 5) result += N1;
          else if (run2 > 5) result++;
        } else {
          this.addHistory(run2, hist);
          if (!color) result += this.countPatterns(hist) * N3;
          color = this.modules[y][x];
          run2 = 1;
        }
      }
      result += this.terminateAndCount(color, run2, hist) * N3;
    }
    for (let x = 0; x < size; x++) {
      let color = false;
      let run2 = 0;
      const hist = new Array(7).fill(0);
      for (let y = 0; y < size; y++) {
        if (this.modules[y][x] === color) {
          run2++;
          if (run2 === 5) result += N1;
          else if (run2 > 5) result++;
        } else {
          this.addHistory(run2, hist);
          if (!color) result += this.countPatterns(hist) * N3;
          color = this.modules[y][x];
          run2 = 1;
        }
      }
      result += this.terminateAndCount(color, run2, hist) * N3;
    }
    for (let y = 0; y < size - 1; y++) {
      for (let x = 0; x < size - 1; x++) {
        const c = this.modules[y][x];
        if (c === this.modules[y][x + 1] && c === this.modules[y + 1][x] && c === this.modules[y + 1][x + 1]) {
          result += N2;
        }
      }
    }
    let dark = 0;
    for (const row of this.modules) for (const cell of row) if (cell) dark++;
    const total = size * size;
    const k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
    return result + k * N4;
  }
  countPatterns(hist) {
    const n = hist[1];
    const core = n > 0 && hist[2] === n && hist[3] === n * 3 && hist[4] === n && hist[5] === n;
    return (core && hist[0] >= n * 4 && hist[6] >= n ? 1 : 0) + (core && hist[6] >= n * 4 && hist[0] >= n ? 1 : 0);
  }
  terminateAndCount(color, runLength, hist) {
    let len = runLength;
    if (color) {
      this.addHistory(len, hist);
      len = 0;
    }
    len += this.size;
    this.addHistory(len, hist);
    return this.countPatterns(hist);
  }
  addHistory(runLength, hist) {
    let len = runLength;
    if (hist[0] === 0) len += this.size;
    hist.pop();
    hist.unshift(len);
  }
};
function encodeQr(text, eccLevel = "M") {
  const ecl = ECC[eccLevel] === void 0 ? ECC.M : ECC[eccLevel];
  const bytes = new TextEncoder().encode(text);
  let ver = 1;
  let dataCodewords = null;
  for (; ver <= 40; ver++) {
    dataCodewords = buildDataCodewords(bytes, ver, ecl);
    if (dataCodewords) break;
  }
  if (!dataCodewords) throw new Error("QR content too long");
  const qr = new QrMatrix(ver, ecl);
  qr.drawFunctionPatterns();
  qr.drawCodewords(addEccAndInterleave(dataCodewords, ver, ecl));
  let bestMask = 0;
  let minPenalty = Infinity;
  for (let mask = 0; mask < 8; mask++) {
    qr.applyMask(mask);
    qr.drawFormatBits(mask);
    const p = qr.penalty();
    if (p < minPenalty) {
      minPenalty = p;
      bestMask = mask;
    }
    qr.applyMask(mask);
  }
  qr.applyMask(bestMask);
  qr.drawFormatBits(bestMask);
  return { size: qr.size, modules: qr.modules, version: ver };
}
__name(encodeQr, "encodeQr");
var CRC_TABLE = (() => {
  const table3 = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    table3[n] = c >>> 0;
  }
  return table3;
})();
function crc32(bytes) {
  let c = 4294967295;
  for (const b of bytes) c = CRC_TABLE[(c ^ b) & 255] ^ c >>> 8;
  return (c ^ 4294967295) >>> 0;
}
__name(crc32, "crc32");
function chunk(type, data) {
  const typeBytes = new TextEncoder().encode(type);
  const body = new Uint8Array(typeBytes.length + data.length);
  body.set(typeBytes, 0);
  body.set(data, typeBytes.length);
  const out = new Uint8Array(body.length + 8);
  const view = new DataView(out.buffer);
  view.setUint32(0, data.length);
  out.set(body, 4);
  view.setUint32(out.length - 4, crc32(body));
  return out;
}
__name(chunk, "chunk");
async function deflate(bytes) {
  const cs = new CompressionStream("deflate");
  const stream = new Blob([bytes]).stream().pipeThrough(cs);
  const buf = await new Response(stream).arrayBuffer();
  return new Uint8Array(buf);
}
__name(deflate, "deflate");
function concat(parts) {
  const total = parts.reduce((sum, p) => sum + p.length, 0);
  const out = new Uint8Array(total);
  let off2 = 0;
  for (const p of parts) {
    out.set(p, off2);
    off2 += p.length;
  }
  return out;
}
__name(concat, "concat");
async function qrPng(text, opts = {}) {
  const scale = opts.scale || 8;
  const border = opts.border === void 0 ? 4 : opts.border;
  const { size, modules } = encodeQr(text, opts.ecc || "M");
  const dim = (size + border * 2) * scale;
  const raw = new Uint8Array((dim + 1) * dim);
  for (let y = 0; y < dim; y++) {
    const rowStart = y * (dim + 1);
    raw[rowStart] = 0;
    const my = Math.floor(y / scale) - border;
    for (let x = 0; x < dim; x++) {
      const mx = Math.floor(x / scale) - border;
      const dark = my >= 0 && my < size && mx >= 0 && mx < size ? modules[my][mx] : false;
      raw[rowStart + 1 + x] = dark ? 0 : 255;
    }
  }
  const ihdr = new Uint8Array(13);
  const dv = new DataView(ihdr.buffer);
  dv.setUint32(0, dim);
  dv.setUint32(4, dim);
  ihdr[8] = 8;
  ihdr[9] = 0;
  return concat([
    new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", await deflate(raw)),
    chunk("IEND", new Uint8Array(0))
  ]);
}
__name(qrPng, "qrPng");

// src/subscription.js
var TOKEN_RE = /^[A-Za-z0-9_-]{6,200}$/;
function subscriptionUrls(rawUrl) {
  let url;
  try {
    url = new URL(String(rawUrl || "").trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  const parts = url.pathname.split("/").filter(Boolean);
  let token = null;
  if (parts[0] === "api" && parts[1] === "public" && parts[2] === "sub") token = parts[3];
  else if (parts[0] === "p" || parts[0] === "sub-group" || parts[0] === "sub") token = parts[1];
  if (!token || !TOKEN_RE.test(token)) return null;
  const encoded = encodeURIComponent(token);
  return {
    token,
    pageUrl: `${url.origin}/p/${encoded}`,
    subUrl: `${url.origin}/sub-group/${encoded}`,
    apiUrl: `${url.origin}/api/public/sub/${encoded}`
  };
}
__name(subscriptionUrls, "subscriptionUrls");
function subscriptionApiUrl(rawUrl) {
  const urls = subscriptionUrls(rawUrl);
  return urls ? urls.apiUrl : null;
}
__name(subscriptionApiUrl, "subscriptionApiUrl");
function subscriptionClientUrl(rawUrl) {
  const urls = subscriptionUrls(rawUrl);
  return urls ? urls.subUrl : String(rawUrl || "");
}
__name(subscriptionClientUrl, "subscriptionClientUrl");
function formatBytes(value) {
  let bytes = Math.max(0, Number(value) || 0);
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unit = 0;
  while (bytes >= 1024 && unit < units.length - 1) {
    bytes /= 1024;
    unit++;
  }
  const digits = unit === 0 ? 0 : bytes >= 10 ? 1 : 2;
  return `${toFa(bytes.toFixed(digits).replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1"))} ${units[unit]}`;
}
__name(formatBytes, "formatBytes");
function parseFormattedBytes(value) {
  const input = String(value || "").replace(/[۰-۹]/g, (d) => String("\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9".indexOf(d))).replace(/,/g, "").trim();
  const match = input.match(/^([0-9]+(?:\.[0-9]+)?)\s*(B|KB|MB|GB|TB)$/i);
  if (!match) return 0;
  const powers = { B: 0, KB: 1, MB: 2, GB: 3, TB: 4 };
  return Math.round(Number(match[1]) * 1024 ** powers[match[2].toUpperCase()]);
}
__name(parseFormattedBytes, "parseFormattedBytes");
function normalizeLink(link, index) {
  const limitBytes = Math.max(
    0,
    Number(link.limit_bytes) || parseFormattedBytes(link.limit_fmt || link.limit) || 0
  );
  const usedBytes = Math.max(
    0,
    Number(link.used_bytes) || parseFormattedBytes(link.used_fmt || link.used) || 0
  );
  return {
    index: index + 1,
    uuid: String(link.uuid || ""),
    label: String(link.label || `\u06A9\u0627\u0646\u0641\u06CC\u06AF ${index + 1}`),
    active: link.active !== false,
    protocol: String(link.protocol || "-"),
    usedBytes,
    limitBytes,
    remainingBytes: limitBytes > 0 ? Math.max(0, limitBytes - usedBytes) : null,
    expiresAt: link.expires_at ? String(link.expires_at) : null,
    vlessLink: String(link.vless_link || ""),
    subUrl: String(link.sub_url || ""),
    connections: Math.max(0, Number(link.connections) || 0),
    ipLimit: Math.max(0, Number(link.ip_limit) || 0),
    speedLimitBytes: Math.max(0, Number(link.speed_limit_bytes) || 0)
  };
}
__name(normalizeLink, "normalizeLink");
async function loadSubscription(rawUrl) {
  const apiUrl2 = subscriptionApiUrl(rawUrl);
  if (!apiUrl2) throw new Error("UNSUPPORTED_SUBSCRIPTION_URL");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12e3);
  try {
    const response = await fetch(apiUrl2, {
      headers: {
        accept: "application/json, text/plain, */*",
        "cache-control": "no-cache"
      },
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`SUBSCRIPTION_HTTP_${response.status}`);
    const raw = (await response.text()).replace(/^\uFEFF/, "").trim();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error("INVALID_SUBSCRIPTION_JSON");
    }
    if (data && data.data && typeof data.data === "object") data = data.data;
    if (!data || typeof data !== "object" || !Array.isArray(data.links)) {
      throw new Error("INVALID_SUBSCRIPTION_JSON");
    }
    const links = data.links.map(normalizeLink);
    const linksUsedBytes = links.reduce((sum, link) => sum + link.usedBytes, 0);
    const usedBytes = Math.max(0, Number(data.total_used_bytes) || parseFormattedBytes(data.total_used_fmt)) || linksUsedBytes;
    const limitedLinks = links.filter((link) => link.limitBytes > 0);
    const limitBytes = limitedLinks.length ? limitedLinks.reduce((sum, link) => sum + link.limitBytes, 0) : 0;
    const expiries = links.map((link) => link.expiresAt).filter(Boolean).map((value) => new Date(value).getTime()).filter(Number.isFinite);
    return {
      name: String(data.name || ""),
      description: String(data.desc || ""),
      locked: Boolean(data.locked),
      subUrl: String(data.sub_url || rawUrl),
      activeConnections: Math.max(0, Number(data.active_connections) || 0),
      usedBytes,
      limitBytes,
      remainingBytes: limitBytes > 0 ? Math.max(0, limitBytes - usedBytes) : null,
      expiresAt: expiries.length ? new Date(Math.min(...expiries)).toISOString() : null,
      links
    };
  } finally {
    clearTimeout(timer);
  }
}
__name(loadSubscription, "loadSubscription");
async function tryLoadSubscription(rawUrl) {
  if (!subscriptionApiUrl(rawUrl)) return null;
  try {
    return await loadSubscription(rawUrl);
  } catch (error3) {
    console.log("SUBSCRIPTION_FETCH_ERROR", String(error3));
    return null;
  }
}
__name(tryLoadSubscription, "tryLoadSubscription");
function usageLines(info3) {
  if (!info3) return "";
  const limit = info3.limitBytes > 0 ? formatBytes(info3.limitBytes) : "\u0646\u0627\u0645\u062D\u062F\u0648\u062F";
  const remaining = info3.remainingBytes === null ? "\u0646\u0627\u0645\u062D\u062F\u0648\u062F" : formatBytes(info3.remainingBytes);
  return `\u{1F4BE} \u0645\u0635\u0631\u0641\u200C\u0634\u062F\u0647: <b>${formatBytes(info3.usedBytes)}</b> \u0627\u0632 <b>${limit}</b>
\u{1F4C9} \u062D\u062C\u0645 \u0628\u0627\u0642\u06CC\u200C\u0645\u0627\u0646\u062F\u0647: <b>${remaining}</b>
\u{1F50C} \u0627\u062A\u0635\u0627\u0644 \u0641\u0639\u0627\u0644: ${toFa(info3.activeConnections)}
\u{1F510} \u0648\u0636\u0639\u06CC\u062A: ${info3.locked ? "\u{1F534} \u0642\u0641\u0644\u200C\u0634\u062F\u0647" : "\u{1F7E2} \u0641\u0639\u0627\u0644"}`;
}
__name(usageLines, "usageLines");
function configCard(link) {
  const limit = link.limitBytes > 0 ? formatBytes(link.limitBytes) : "\u0646\u0627\u0645\u062D\u062F\u0648\u062F";
  const remaining = link.remainingBytes === null ? "\u0646\u0627\u0645\u062D\u062F\u0648\u062F" : formatBytes(link.remainingBytes);
  const expiry = link.expiresAt ? toFa(String(link.expiresAt).slice(0, 10)) : "\u0628\u062F\u0648\u0646 \u062A\u0627\u0631\u06CC\u062E";
  return `\u{1F9E9} <b>${escapeHtml(link.label)}</b>
\u0648\u0636\u0639\u06CC\u062A: ${link.active ? "\u{1F7E2} \u0641\u0639\u0627\u0644" : "\u{1F534} \u063A\u06CC\u0631\u0641\u0639\u0627\u0644"}
\u067E\u0631\u0648\u062A\u06A9\u0644: <code>${escapeHtml(link.protocol)}</code>
\u0645\u0635\u0631\u0641: ${formatBytes(link.usedBytes)} \u0627\u0632 ${limit}
\u0628\u0627\u0642\u06CC\u200C\u0645\u0627\u0646\u062F\u0647: ${remaining}
\u0627\u0646\u0642\u0636\u0627: ${expiry}
\u0627\u062A\u0635\u0627\u0644\u0627\u062A: ${toFa(link.connections)}${link.ipLimit ? ` | \u0645\u062D\u062F\u0648\u062F\u06CC\u062A IP: ${toFa(link.ipLimit)}` : ""}

` + (link.vlessLink ? `\u{1F517} \u06A9\u0627\u0646\u0641\u06CC\u06AF \u062A\u06A9\u06CC:
<code>${escapeHtml(link.vlessLink)}</code>` : "\u26A0\uFE0F \u0644\u06CC\u0646\u06A9 \u06A9\u0627\u0646\u0641\u06CC\u06AF \u0645\u0648\u062C\u0648\u062F \u0646\u06CC\u0633\u062A.");
}
__name(configCard, "configCard");

// src/core.js
function adminIds(env2) {
  return String(env2.ADMIN_IDS || "").split(/[,\s]+/).map((x) => Number(x.trim())).filter((n) => Number.isFinite(n) && n !== 0);
}
__name(adminIds, "adminIds");
function isAdmin(env2, userId) {
  return adminIds(env2).includes(Number(userId));
}
__name(isAdmin, "isAdmin");
async function notifyAdmins(env2, text, extra = {}) {
  for (const id of adminIds(env2)) await sendMessage(env2, id, text, extra);
}
__name(notifyAdmins, "notifyAdmins");
function poolLabel(pool) {
  if (pool === "trial") return "\u{1F381} \u0627\u06A9\u0627\u0646\u062A \u062A\u0633\u062A";
  return LOCATIONS[pool] ? LOCATIONS[pool].label : String(pool);
}
__name(poolLabel, "poolLabel");
async function cardInfo(env2) {
  const number = await getSetting(env2, "card_number", env2.CARD_NUMBER || "");
  const holder = await getSetting(env2, "card_holder", env2.CARD_HOLDER || "");
  return { number, holder };
}
__name(cardInfo, "cardInfo");
function daysLeft(expiresAt) {
  const ms = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 864e5));
}
__name(daysLeft, "daysLeft");
function addDays(date, days) {
  return new Date(date.getTime() + days * 864e5);
}
__name(addDays, "addDays");
async function sendQr(env2, chatId, url, caption) {
  try {
    const png = await qrPng(url, { scale: 8, border: 4, ecc: "M" });
    await sendPhotoBytes(env2, chatId, png, "service-qr.png", caption);
    return true;
  } catch (err) {
    console.log("QR_ERROR", String(err));
    await sendMessage(env2, chatId, "\u26A0\uFE0F \u062A\u0648\u0644\u06CC\u062F QR \u0645\u0645\u06A9\u0646 \u0646\u0634\u062F\u060C \u0627\u0645\u0627 \u0644\u06CC\u0646\u06A9 \u0633\u0627\u0644\u0645 \u0627\u0633\u062A.");
    return false;
  }
}
__name(sendQr, "sendQr");
function serviceCard(service, subscription = null) {
  const volume = subscription ? usageLines(subscription) : `\u{1F4BE} \u062D\u062C\u0645 \u067E\u0644\u0646: <b>${escapeHtml(service.volume)}</b>`;
  const expiresAt = subscription && subscription.expiresAt ? subscription.expiresAt : service.expires_at;
  const urls = subscriptionUrls(service.url);
  const linkLines = urls ? `\u{1F310} \u0635\u0641\u062D\u0647 \u0633\u0631\u0648\u06CC\u0633:
<code>${escapeHtml(urls.pageUrl)}</code>
\u{1F517} \u0644\u06CC\u0646\u06A9 \u0627\u0634\u062A\u0631\u0627\u06A9:
<code>${escapeHtml(urls.subUrl)}</code>` : `\u{1F517} \u0644\u06CC\u0646\u06A9 \u0627\u062A\u0635\u0627\u0644:
<code>${escapeHtml(service.url)}</code>`;
  return `\u{1F194} \u0633\u0631\u0648\u06CC\u0633 <b>#${toFa(service.id)}</b>
\u{1F4CD} \u0644\u0648\u06A9\u06CC\u0634\u0646: ${poolLabel(service.pool)}
\u{1F4E6} \u067E\u0644\u0646: ${escapeHtml(service.plan_title)}
${volume}
\u23F3 \u0631\u0648\u0632\u0647\u0627\u06CC \u0628\u0627\u0642\u06CC\u200C\u0645\u0627\u0646\u062F\u0647: ${toFa(daysLeft(expiresAt))} \u0631\u0648\u0632
` + linkLines;
}
__name(serviceCard, "serviceCard");
async function deliverOrder(env2, order) {
  const plan = planById(order.plan_id);
  if (!plan) {
    await updateOrder(env2, order.id, { status: "failed" });
    await notifyAdmins(env2, `\u26A0\uFE0F \u0633\u0641\u0627\u0631\u0634 #${order.id} \u067E\u0644\u0646 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0627\u0631\u062F.`);
    return { ok: false, reason: "plan" };
  }
  const poolKey = poolKeyFor(order.pool, plan.id);
  const link = await takeLink(env2, poolKey, order.user_id, order.id);
  if (!link) {
    if (order.status !== "awaiting_stock") {
      await updateOrder(env2, order.id, { status: "awaiting_stock" });
      await sendMessage(
        env2,
        order.user_id,
        `\u23F3 \u067E\u0631\u062F\u0627\u062E\u062A \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F\u060C \u0627\u0645\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u0644\u06CC\u0646\u06A9 ${poolKeyLabel(poolKey)} \u062A\u0645\u0648\u0645 \u0634\u062F\u0647.
\u0633\u0641\u0627\u0631\u0634 <b>#${toFa(order.id)}</b> \u062F\u0631 \u0635\u0641 \u0642\u0631\u0627\u0631 \u06AF\u0631\u0641\u062A \u0648 \u0628\u0647 \u0645\u062D\u0636 \u0634\u0627\u0631\u0698 \u0645\u0648\u062C\u0648\u062F\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u0631\u0627\u062A \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0647 \u{1F64F}`
      );
      await notifyAdmins(
        env2,
        `\u{1F6A8} \u0645\u0648\u062C\u0648\u062F\u06CC \u0628\u0627\u0646\u06A9 <b>${poolKeyLabel(poolKey)}</b> \u062A\u0645\u0627\u0645 \u0634\u062F!
\u0633\u0641\u0627\u0631\u0634 #${order.id} \u062F\u0631 \u0635\u0641 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0633\u062A.`
      );
    }
    return { ok: false, reason: "stock" };
  }
  const started = /* @__PURE__ */ new Date();
  const expires = addDays(started, plan.days);
  if (order.renew_service_id) await archiveService(env2, order.renew_service_id);
  const service = await createService(env2, {
    user_id: order.user_id,
    order_id: order.id,
    link_id: link.id,
    url: link.url,
    pool: order.pool,
    plan_id: plan.id,
    plan_title: plan.title,
    volume: plan.volume,
    days: plan.days,
    is_trial: 0,
    started_at: started.toISOString(),
    expires_at: expires.toISOString()
  });
  await updateOrder(env2, order.id, { status: "delivered" });
  const subscription = await tryLoadSubscription(service.url);
  await sendMessage(env2, order.user_id, `\u2705 \u0633\u0631\u0648\u06CC\u0633 \u0634\u0645\u0627 \u0641\u0639\u0627\u0644 \u0634\u062F!

${serviceCard(service, subscription)}`, {
    reply_markup: mainKeyboard(isAdmin(env2, order.user_id))
  });
  await sendQr(env2, order.user_id, subscriptionClientUrl(service.url), `\u{1F533} QR \u0633\u0631\u0648\u06CC\u0633 #${toFa(service.id)}`);
  await sendGuidePrompt(env2, order.user_id, service.id);
  await notifyAdmins(
    env2,
    `\u{1F4E6} \u0633\u0631\u0648\u06CC\u0633 #${service.id} \u0628\u0631\u0627\u06CC \u06A9\u0627\u0631\u0628\u0631 <code>${order.user_id}</code> \u062A\u062D\u0648\u06CC\u0644 \u0634\u062F.
\u0645\u0628\u0644\u063A: ${money(order.final_amount)} \u062A\u0648\u0645\u0627\u0646`
  );
  return { ok: true, service };
}
__name(deliverOrder, "deliverOrder");
function sendGuidePrompt(env2, chatId, serviceId) {
  return sendMessage(env2, chatId, GUIDE_INTRO, {
    reply_markup: guideKeyboard(serviceId)
  });
}
__name(sendGuidePrompt, "sendGuidePrompt");
async function processStockQueue(env2, poolKey) {
  const { pool, planId } = parsePoolKey(poolKey);
  if (pool === "trial") return 0;
  const orders = await pendingStockOrders(env2, pool, planId);
  let delivered = 0;
  for (const order of orders) {
    const res = await deliverOrder(env2, order);
    if (!res.ok) break;
    delivered++;
  }
  return delivered;
}
__name(processStockQueue, "processStockQueue");
async function sendReceiptToAdmins(env2, order, user, message) {
  const who = user.username ? `@${user.username}` : escapeHtml(user.first_name || "\u06A9\u0627\u0631\u0628\u0631");
  const plan = planById(order.plan_id);
  const caption = [
    "\u{1F9FE} <b>\u0631\u0633\u06CC\u062F \u062C\u062F\u06CC\u062F</b>",
    `\u{1F194} \u0633\u0641\u0627\u0631\u0634: <b>#${toFa(order.id)}</b>`,
    `\u{1F464} \u06A9\u0627\u0631\u0628\u0631: ${who} (<code>${user.id}</code>)`,
    order.kind === "topup" ? "\u{1F45B} \u0646\u0648\u0639: \u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644" : `\u{1F4CD} ${poolLabel(order.pool)}
\u{1F4E6} ${plan ? escapeHtml(plan.title) : "-"}`,
    `\u{1F4B0} \u0645\u0628\u0644\u063A: <b>${money(order.final_amount)} \u062A\u0648\u0645\u0627\u0646</b>`,
    order.discount_code ? `\u{1F39F} \u06A9\u062F \u062A\u062E\u0641\u06CC\u0641: <code>${escapeHtml(order.discount_code)}</code>` : null
  ].filter(Boolean).join("\n");
  const markup = {
    inline_keyboard: [
      [
        { text: "\u2705 \u062A\u0623\u06CC\u06CC\u062F", callback_data: `ok:${order.id}` },
        { text: "\u274C \u0631\u062F", callback_data: `no:${order.id}` }
      ],
      [{ text: "\u{1F6AB} \u0631\u062F + \u0628\u0646 \u06A9\u0627\u0631\u0628\u0631", callback_data: `bn:${order.id}` }]
    ]
  };
  for (const adminId of adminIds(env2)) {
    await copyMessage(env2, adminId, message.chat.id, message.message_id, {
      caption,
      parse_mode: "HTML",
      reply_markup: markup
    });
  }
}
__name(sendReceiptToAdmins, "sendReceiptToAdmins");
async function approveOrder(env2, order, adminId) {
  await updateOrder(env2, order.id, {
    status: "approved",
    admin_id: adminId,
    decided_at: nowIso()
  });
  const fresh = await getOrder(env2, order.id);
  if (fresh.kind === "topup") {
    const balance = await addBalance(
      env2,
      fresh.user_id,
      fresh.final_amount,
      "topup",
      `\u0634\u0627\u0631\u0698 \u06A9\u0627\u0631\u062A \u0628\u0647 \u06A9\u0627\u0631\u062A - \u0633\u0641\u0627\u0631\u0634 #${fresh.id}`
    );
    await updateOrder(env2, fresh.id, { status: "delivered" });
    await sendMessage(
      env2,
      fresh.user_id,
      `\u2705 \u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u062A\u0623\u06CC\u06CC\u062F \u0634\u062F.
\u0645\u0628\u0644\u063A: ${money(fresh.final_amount)} \u062A\u0648\u0645\u0627\u0646
\u{1F45B} \u0645\u0648\u062C\u0648\u062F\u06CC \u062C\u062F\u06CC\u062F: <b>${money(balance)} \u062A\u0648\u0645\u0627\u0646</b>`,
      { reply_markup: mainKeyboard(isAdmin(env2, fresh.user_id)) }
    );
    return { ok: true, kind: "topup" };
  }
  const res = await deliverOrder(env2, fresh);
  return { ok: true, kind: "service", delivered: res.ok };
}
__name(approveOrder, "approveOrder");
async function rejectOrder(env2, order, adminId, ban = false) {
  await updateOrder(env2, order.id, {
    status: "rejected",
    admin_id: adminId,
    decided_at: nowIso()
  });
  if (order.discount_code) await releaseCode(env2, order.discount_code, order.id);
  if (ban) {
    await setBanned(env2, order.user_id, true);
    await clearState(env2, order.user_id);
    await sendMessage(
      env2,
      order.user_id,
      "\u26D4\uFE0F \u0631\u0633\u06CC\u062F \u0634\u0645\u0627 \u062C\u0639\u0644\u06CC \u062A\u0634\u062E\u06CC\u0635 \u062F\u0627\u062F\u0647 \u0634\u062F \u0648 \u062F\u0633\u062A\u0631\u0633\u06CC \u0634\u0645\u0627 \u0628\u0647 \u0631\u0628\u0627\u062A \u0645\u0633\u062F\u0648\u062F \u0634\u062F.",
      { reply_markup: { remove_keyboard: true } }
    );
  } else {
    await sendMessage(
      env2,
      order.user_id,
      `\u274C \u0631\u0633\u06CC\u062F \u0633\u0641\u0627\u0631\u0634 <b>#${toFa(order.id)}</b> \u062A\u0623\u06CC\u06CC\u062F \u0646\u0634\u062F.
\u0627\u06AF\u0631 \u0641\u06A9\u0631 \u0645\u06CC\u200C\u06A9\u0646\u06CC \u0627\u0634\u062A\u0628\u0627\u0647 \u0634\u062F\u0647\u060C \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062F\u0631 \u062A\u0645\u0627\u0633 \u0628\u0627\u0634.`,
      { reply_markup: mainKeyboard(isAdmin(env2, order.user_id)) }
    );
  }
  return { ok: true };
}
__name(rejectOrder, "rejectOrder");

// src/admin.js
var POOL_LABELS = {
  [LOCATIONS.nl.label]: "nl",
  [LOCATIONS.us.label]: "us",
  [TRIAL.title]: "trial"
};
function poolKeyboard() {
  return keyboard([[LOCATIONS.nl.label], [LOCATIONS.us.label], [TRIAL.title], [BTN.home]]);
}
__name(poolKeyboard, "poolKeyboard");
function planKeyboard(pool) {
  const rows = plansFor(pool).map((p) => [p.title]);
  rows.push([BTN.cancel]);
  return keyboard(rows);
}
__name(planKeyboard, "planKeyboard");
function planByTitle(pool, title2) {
  return plansFor(pool).find((p) => p.title === title2) || null;
}
__name(planByTitle, "planByTitle");
function cancelKeyboard() {
  return keyboard([[BTN.cancel]]);
}
__name(cancelKeyboard, "cancelKeyboard");
function randomCode(len = 8) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  let out = "";
  for (let i = 0; i < len; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}
__name(randomCode, "randomCode");
async function showPanel(env2, chatId, userId, text) {
  await setState(env2, userId, "admin_idle", {});
  await sendMessage(env2, chatId, text || "\u{1F6E0} <b>\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A</b>\n\u06CC\u06A9 \u06AF\u0632\u06CC\u0646\u0647 \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:", {
    reply_markup: adminKeyboard()
  });
}
__name(showPanel, "showPanel");
async function sendStock(env2, chatId) {
  const rows = await stockReport(env2);
  const map = {};
  for (const r of rows) map[r.pool] = r;
  const lines = allPoolKeys().map((key) => {
    const r = map[key] || { free_count: 0, used_count: 0 };
    const free = Number(r.free_count || 0);
    const warn3 = free === 0 ? " \u{1F6A8}" : free <= 3 ? " \u26A0\uFE0F" : "";
    return `${poolKeyLabel(key)}${warn3}
   \u2705 \u0622\u0632\u0627\u062F: ${toFa(free)} | \u{1F512} \u0645\u0635\u0631\u0641\u200C\u0634\u062F\u0647: ${toFa(r.used_count || 0)}`;
  });
  await sendMessage(env2, chatId, `\u{1F4CA} <b>\u0645\u0648\u062C\u0648\u062F\u06CC \u0644\u06CC\u0646\u06A9\u200C\u0647\u0627</b>

${lines.join("\n")}`, {
    reply_markup: adminKeyboard()
  });
}
__name(sendStock, "sendStock");
async function sendStats(env2, chatId) {
  const s = await statsSummary(env2);
  await sendMessage(
    env2,
    chatId,
    `\u{1F4C8} <b>\u0622\u0645\u0627\u0631 \u0631\u0628\u0627\u062A</b>

\u{1F465} \u06A9\u0627\u0631\u0628\u0631\u0627\u0646: ${toFa(s.users)}
\u26D4\uFE0F \u0645\u0633\u062F\u0648\u062F: ${toFa(s.banned)}
\u{1F4E6} \u0633\u0631\u0648\u06CC\u0633\u200C\u0647\u0627\u06CC \u0641\u0631\u0648\u062E\u062A\u0647\u200C\u0634\u062F\u0647: ${toFa(s.services)}
\u{1F381} \u0627\u06A9\u0627\u0646\u062A \u062A\u0633\u062A: ${toFa(s.trials)}
\u{1F517} \u0644\u06CC\u0646\u06A9 \u0622\u0632\u0627\u062F: ${toFa(s.free_links)}
\u{1F4B0} \u062F\u0631\u0622\u0645\u062F \u062A\u062D\u0648\u06CC\u0644\u200C\u0634\u062F\u0647: ${money(s.revenue)} \u062A\u0648\u0645\u0627\u0646`,
    { reply_markup: adminKeyboard() }
  );
}
__name(sendStats, "sendStats");
async function sendCodes(env2, chatId) {
  const codes = await listCodes(env2);
  if (!codes.length) {
    await sendMessage(env2, chatId, "\u{1F4CB} \u0647\u0646\u0648\u0632 \u06A9\u062F\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647.", { reply_markup: adminKeyboard() });
    return;
  }
  const kindText = { percent: "\u062F\u0631\u0635\u062F\u06CC", amount: "\u0645\u0628\u0644\u063A\u06CC", gift: "\u0647\u062F\u06CC\u0647" };
  const lines = codes.map((c) => {
    const value = c.kind === "percent" ? `${toFa(c.value)}\u066A` : `${money(c.value)} \u062A\u0648\u0645\u0627\u0646`;
    return `\u2022 <code>${escapeHtml(c.code)}</code> \u2014 ${kindText[c.kind] || c.kind} ${value} \u2014 \u0645\u0635\u0631\u0641: ${toFa(c.used)}/${toFa(c.max_uses)}${c.active ? "" : " \u2014 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644"}`;
  });
  await sendMessage(env2, chatId, `\u{1F4CB} <b>\u06A9\u062F\u0647\u0627</b>

${lines.join("\n")}`, {
    reply_markup: adminKeyboard()
  });
}
__name(sendCodes, "sendCodes");
async function handleMessage(env2, message, user) {
  const chatId = message.chat.id;
  const text = (message.text || "").trim();
  const state = await getState(env2, user.id);
  if (text === BTN.adminPanel) {
    await showPanel(env2, chatId, user.id);
    return true;
  }
  if (text === BTN.home || text === BTN.cancel) {
    await clearState(env2, user.id);
    await sendMessage(env2, chatId, "\u{1F3E0} \u0645\u0646\u0648\u06CC \u0627\u0635\u0644\u06CC", { reply_markup: mainKeyboard(true) });
    return true;
  }
  const reply = text.match(/^پاسخ\s+(\d+)\s+([\s\S]+)$/);
  if (reply) {
    const targetId = Number(toEnDigits(reply[1]));
    await sendMessage(env2, targetId, `\u{1F4AC} <b>\u067E\u0627\u0633\u062E \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC:</b>

${escapeHtml(reply[2])}`);
    await sendMessage(env2, chatId, "\u2705 \u067E\u0627\u0633\u062E \u0627\u0631\u0633\u0627\u0644 \u0634\u062F.");
    return true;
  }
  switch (text) {
    case BTN.aAddLinks:
      await setState(env2, user.id, "a_links_pool", {});
      await sendMessage(env2, chatId, "\u2795 \u0644\u06CC\u0646\u06A9\u200C\u0647\u0627 \u0628\u0631\u0627\u06CC \u06A9\u062F\u0648\u0645 \u0628\u062E\u0634 \u0627\u0636\u0627\u0641\u0647 \u0628\u0634\u0647\u061F", {
        reply_markup: poolKeyboard()
      });
      return true;
    case BTN.aStock:
      await sendStock(env2, chatId);
      return true;
    case BTN.aMakeCode:
      await setState(env2, user.id, "a_code_kind", {});
      await sendMessage(env2, chatId, "\u{1F39F} \u0646\u0648\u0639 \u06A9\u062F \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:", {
        reply_markup: keyboard([
          ["\u062A\u062E\u0641\u06CC\u0641 \u062F\u0631\u0635\u062F\u06CC"],
          ["\u062A\u062E\u0641\u06CC\u0641 \u0645\u0628\u0644\u063A\u06CC"],
          ["\u06A9\u062F \u0647\u062F\u06CC\u0647 (\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644)"],
          [BTN.cancel]
        ])
      });
      return true;
    case BTN.aListCodes:
      await sendCodes(env2, chatId);
      return true;
    case BTN.aSetCard:
      await setState(env2, user.id, "a_card", {});
      await sendMessage(
        env2,
        chatId,
        "\u{1F4B3} \u0634\u0645\u0627\u0631\u0647 \u06A9\u0627\u0631\u062A \u0648 \u0646\u0627\u0645 \u0635\u0627\u062D\u0628 \u062D\u0633\u0627\u0628 \u0631\u0648 \u062F\u0631 \u062F\u0648 \u062E\u0637 \u0628\u0641\u0631\u0633\u062A:\n\n<code>6037xxxxxxxxxxxx\n\u0639\u0644\u06CC \u0631\u0636\u0627\u06CC\u06CC</code>",
        { reply_markup: cancelKeyboard() }
      );
      return true;
    case BTN.aWallet:
      await setState(env2, user.id, "a_wallet", {});
      await sendMessage(
        env2,
        chatId,
        "\u{1F4B0} \u0634\u0646\u0627\u0633\u0647 \u06A9\u0627\u0631\u0628\u0631 \u0648 \u0645\u0628\u0644\u063A \u0631\u0648 \u0628\u0627 \u0641\u0627\u0635\u0644\u0647 \u0628\u0641\u0631\u0633\u062A (\u0645\u0628\u0644\u063A \u0645\u0646\u0641\u06CC = \u06A9\u0633\u0631):\n<code>123456789 50000</code>",
        { reply_markup: cancelKeyboard() }
      );
      return true;
    case BTN.aUsers:
      await setState(env2, user.id, "a_users", {});
      await sendMessage(
        env2,
        chatId,
        "\u{1F465} \u06CC\u06A9\u06CC \u0627\u0632 \u062F\u0633\u062A\u0648\u0631\u0627\u062A \u0631\u0648 \u0628\u0641\u0631\u0633\u062A:\n\n<code>\u0628\u0646 123456789</code>\n<code>\u0631\u0641\u0639\u0628\u0646 123456789</code>\n<code>\u06A9\u0627\u0631\u0628\u0631 123456789</code>",
        { reply_markup: cancelKeyboard() }
      );
      return true;
    case BTN.aDeleteService:
      await setState(env2, user.id, "a_delete_service_user", {});
      await sendMessage(env2, chatId, "\u{1F5D1} \u0634\u0646\u0627\u0633\u0647 \u0639\u062F\u062F\u06CC \u06A9\u0627\u0631\u0628\u0631 \u0631\u0648 \u0628\u0641\u0631\u0633\u062A \u062A\u0627 \u0633\u0631\u0648\u06CC\u0633\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644\u0634 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0628\u0634\u0647:", {
        reply_markup: cancelKeyboard()
      });
      return true;
    case BTN.aStats:
      await sendStats(env2, chatId);
      return true;
    case BTN.aBroadcast:
      await setState(env2, user.id, "a_broadcast", {});
      await sendMessage(env2, chatId, "\u{1F4E3} \u0645\u062A\u0646 \u067E\u06CC\u0627\u0645 \u0647\u0645\u06AF\u0627\u0646\u06CC \u0631\u0648 \u0628\u0641\u0631\u0633\u062A:", {
        reply_markup: cancelKeyboard()
      });
      return true;
    default:
      break;
  }
  switch (state.step) {
    case "a_links_pool": {
      const pool = POOL_LABELS[text];
      if (!pool) {
        await sendMessage(env2, chatId, "\u0644\u0637\u0641\u0627\u064B \u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u0647\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:", { reply_markup: poolKeyboard() });
        return true;
      }
      if (pool === TRIAL.pool) {
        const poolKey = TRIAL.pool;
        await setState(env2, user.id, "a_links_urls", { poolKey });
        await sendMessage(
          env2,
          chatId,
          `\u{1F517} \u0644\u06CC\u0646\u06A9\u200C\u0647\u0627\u06CC <b>${poolKeyLabel(poolKey)}</b> \u0631\u0648 \u0628\u0641\u0631\u0633\u062A.
\u0647\u0631 \u0644\u06CC\u0646\u06A9 \u062F\u0631 \u06CC\u06A9 \u062E\u0637 \u062C\u062F\u0627\u06AF\u0627\u0646\u0647 (\u0645\u06CC\u200C\u062A\u0648\u0646\u06CC \u06CC\u06A9\u062C\u0627 \u0635\u062F\u062A\u0627 \u0628\u0641\u0631\u0633\u062A\u06CC).`,
          { reply_markup: cancelKeyboard() }
        );
        return true;
      }
      await setState(env2, user.id, "a_links_plan", { pool });
      await sendMessage(
        env2,
        chatId,
        `\u{1F4E6} \u0627\u06CC\u0646 \u0644\u06CC\u0646\u06A9\u200C\u0647\u0627 \u0628\u0631\u0627\u06CC \u06A9\u062F\u0648\u0645 \u067E\u0644\u0646 ${poolLabel(pool)} \u0647\u0633\u062A\u0646\u061F
\u2757\uFE0F \u0647\u0631 \u067E\u0644\u0646 \u0628\u0627\u0646\u06A9 \u0644\u06CC\u0646\u06A9 \u062C\u062F\u0627\u06AF\u0627\u0646\u0647 \u062F\u0627\u0631\u0647 \u0648 \u0641\u0642\u0637 \u0628\u0647 \u062E\u0631\u06CC\u062F\u0627\u0631\u0627\u0646 \u0647\u0645\u0648\u0646 \u067E\u0644\u0646 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0647.`,
        { reply_markup: planKeyboard(pool) }
      );
      return true;
    }
    case "a_links_plan": {
      const pool = state.data.pool;
      const plan = planByTitle(pool, text);
      if (!plan) {
        await sendMessage(env2, chatId, "\u0644\u0637\u0641\u0627\u064B \u067E\u0644\u0646 \u0631\u0648 \u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u0647\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:", {
          reply_markup: planKeyboard(pool)
        });
        return true;
      }
      const poolKey = poolKeyFor(pool, plan.id);
      await setState(env2, user.id, "a_links_urls", { poolKey });
      await sendMessage(
        env2,
        chatId,
        `\u{1F517} \u0644\u06CC\u0646\u06A9\u200C\u0647\u0627\u06CC <b>${poolKeyLabel(poolKey)}</b> \u0631\u0648 \u0628\u0641\u0631\u0633\u062A.
\u{1F4BE} \u062D\u062C\u0645: ${escapeHtml(plan.volume)} | \u23F3 \u0645\u062F\u062A: ${toFa(plan.days)} \u0631\u0648\u0632
\u0647\u0631 \u0644\u06CC\u0646\u06A9 \u0646\u0648\u0639 \u0627\u0648\u0644 (<code>/p/TOKEN</code>) \u062F\u0631 \u06CC\u06A9 \u062E\u0637 \u062C\u062F\u0627\u06AF\u0627\u0646\u0647\u061B \u0631\u0628\u0627\u062A \u0644\u06CC\u0646\u06A9 Base64 \u0648 API JSON \u0631\u0648 \u062E\u0648\u062F\u0634 \u0627\u0632 \u0631\u0648\u06CC \u0627\u0648\u0646 \u0645\u06CC\u200C\u0633\u0627\u0632\u0647.`,
        { reply_markup: cancelKeyboard() }
      );
      return true;
    }
    case "a_links_urls": {
      const supplied = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 5);
      const urls = supplied.map((url) => subscriptionUrls(url)).filter(Boolean).map((item) => item.pageUrl);
      if (!urls.length) {
        await sendMessage(env2, chatId, "\u274C \u0644\u06CC\u0646\u06A9 \u0645\u0639\u062A\u0628\u0631 \u0646\u0648\u0639 <code>/p/TOKEN</code> \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.");
        return true;
      }
      const poolKey = state.data.poolKey || state.data.pool;
      const res = await addLinks(env2, poolKey, urls);
      const delivered = await processStockQueue(env2, poolKey);
      await showPanel(
        env2,
        chatId,
        user.id,
        `\u2705 \u0627\u0641\u0632\u0648\u062F\u0647 \u0634\u062F \u0628\u0647 <b>${poolKeyLabel(poolKey)}</b>

\u{1F195} \u062C\u062F\u06CC\u062F: ${toFa(res.added)}
\u267B\uFE0F \u062A\u06A9\u0631\u0627\u0631\u06CC: ${toFa(res.duplicate)}
` + (delivered ? `\u{1F4E6} \u062A\u062D\u0648\u06CC\u0644 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u0647 \u0635\u0641 \u0627\u0646\u062A\u0638\u0627\u0631: ${toFa(delivered)} \u0633\u0641\u0627\u0631\u0634` : "")
      );
      return true;
    }
    case "a_code_kind": {
      const kind = text === "\u062A\u062E\u0641\u06CC\u0641 \u062F\u0631\u0635\u062F\u06CC" ? "percent" : text === "\u062A\u062E\u0641\u06CC\u0641 \u0645\u0628\u0644\u063A\u06CC" ? "amount" : text === "\u06A9\u062F \u0647\u062F\u06CC\u0647 (\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644)" ? "gift" : null;
      if (!kind) {
        await sendMessage(env2, chatId, "\u0644\u0637\u0641\u0627\u064B \u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u0647\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.");
        return true;
      }
      await setState(env2, user.id, "a_code_value", { kind });
      await sendMessage(
        env2,
        chatId,
        kind === "percent" ? "\u062F\u0631\u0635\u062F \u062A\u062E\u0641\u06CC\u0641 \u0631\u0648 \u0628\u0641\u0631\u0633\u062A (\u06F1 \u062A\u0627 \u06F1\u06F0\u06F0):" : "\u0645\u0628\u0644\u063A \u0631\u0648 \u0628\u0647 \u062A\u0648\u0645\u0627\u0646 \u0628\u0641\u0631\u0633\u062A:",
        { reply_markup: cancelKeyboard() }
      );
      return true;
    }
    case "a_code_value": {
      const value = parseAmount(text);
      if (value === null || value <= 0 || state.data.kind === "percent" && value > 100) {
        await sendMessage(env2, chatId, "\u274C \u0645\u0642\u062F\u0627\u0631 \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A. \u062F\u0648\u0628\u0627\u0631\u0647 \u0628\u0641\u0631\u0633\u062A:");
        return true;
      }
      await setState(env2, user.id, "a_code_uses", { ...state.data, value });
      await sendMessage(env2, chatId, "\u{1F522} \u062A\u0639\u062F\u0627\u062F \u062F\u0641\u0639\u0627\u062A \u0642\u0627\u0628\u0644 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0631\u0648 \u0628\u0641\u0631\u0633\u062A (\u0645\u062B\u0644\u0627\u064B \u06F1 \u06CC\u0627 \u06F5\u06F0):", {
        reply_markup: cancelKeyboard()
      });
      return true;
    }
    case "a_code_uses": {
      const uses = parseAmount(text);
      if (uses === null || uses <= 0) {
        await sendMessage(env2, chatId, "\u274C \u0639\u062F\u062F \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A. \u062F\u0648\u0628\u0627\u0631\u0647 \u0628\u0641\u0631\u0633\u062A:");
        return true;
      }
      await setState(env2, user.id, "a_code_name", { ...state.data, max_uses: uses });
      await sendMessage(
        env2,
        chatId,
        "\u270F\uFE0F \u0645\u062A\u0646 \u06A9\u062F \u0631\u0648 \u0628\u0641\u0631\u0633\u062A\u060C \u06CC\u0627 \u0628\u0631\u0627\u06CC \u0633\u0627\u062E\u062A \u062E\u0648\u062F\u06A9\u0627\u0631 \u06A9\u0644\u0645\u0647 <code>\u062E\u0648\u062F\u06A9\u0627\u0631</code> \u0631\u0648 \u0628\u0641\u0631\u0633\u062A:",
        { reply_markup: keyboard([["\u062E\u0648\u062F\u06A9\u0627\u0631"], [BTN.cancel]]) }
      );
      return true;
    }
    case "a_code_name": {
      const code = text === "\u062E\u0648\u062F\u06A9\u0627\u0631" ? randomCode() : toEnDigits(text).toUpperCase().replace(/\s+/g, "");
      if (!code || code.length < 3) {
        await sendMessage(env2, chatId, "\u274C \u06A9\u062F \u062E\u06CC\u0644\u06CC \u06A9\u0648\u062A\u0627\u0647\u0647.");
        return true;
      }
      if (await getCode(env2, code)) {
        await sendMessage(env2, chatId, "\u274C \u0627\u06CC\u0646 \u06A9\u062F \u0642\u0628\u0644\u0627\u064B \u0648\u062C\u0648\u062F \u062F\u0627\u0631\u0647. \u06CC\u06A9\u06CC \u062F\u06CC\u06AF\u0647 \u0628\u0641\u0631\u0633\u062A:");
        return true;
      }
      const { kind, value, max_uses } = state.data;
      await createCode(env2, code, kind, value, max_uses, user.id);
      const valueText = kind === "percent" ? `${toFa(value)}\u066A` : `${money(value)} \u062A\u0648\u0645\u0627\u0646`;
      await showPanel(
        env2,
        chatId,
        user.id,
        `\u2705 \u06A9\u062F \u0633\u0627\u062E\u062A\u0647 \u0634\u062F:

<code>${escapeHtml(code)}</code>
\u0646\u0648\u0639: ${kind === "gift" ? "\u0647\u062F\u06CC\u0647" : kind === "percent" ? "\u062F\u0631\u0635\u062F\u06CC" : "\u0645\u0628\u0644\u063A\u06CC"}
\u0645\u0642\u062F\u0627\u0631: ${valueText}
\u0638\u0631\u0641\u06CC\u062A: ${toFa(max_uses)} \u0628\u0627\u0631`
      );
      return true;
    }
    case "a_card": {
      const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      if (!lines.length) {
        await sendMessage(env2, chatId, "\u274C \u0648\u0631\u0648\u062F\u06CC \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A.");
        return true;
      }
      await setSetting(env2, "card_number", toEnDigits(lines[0]));
      if (lines[1]) await setSetting(env2, "card_holder", lines[1]);
      await showPanel(env2, chatId, user.id, "\u2705 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u06A9\u0627\u0631\u062A \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F.");
      return true;
    }
    case "a_wallet": {
      const parts = toEnDigits(text).split(/\s+/);
      const targetId = Number(parts[0]);
      const amount = Number(parts[1]);
      if (!Number.isFinite(targetId) || !Number.isFinite(amount) || amount === 0) {
        await sendMessage(env2, chatId, "\u274C \u0641\u0631\u0645\u062A \u0627\u0634\u062A\u0628\u0627\u0647\u0647. \u0645\u062B\u0627\u0644: <code>123456789 50000</code>");
        return true;
      }
      const target = await getUser(env2, targetId);
      if (!target) {
        await sendMessage(env2, chatId, "\u274C \u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631 \u062F\u0631 \u0631\u0628\u0627\u062A \u062B\u0628\u062A \u0646\u0634\u062F\u0647.");
        return true;
      }
      const balance = await addBalance(env2, targetId, amount, "admin", "\u0634\u0627\u0631\u0698 \u062F\u0633\u062A\u06CC \u062A\u0648\u0633\u0637 \u0627\u062F\u0645\u06CC\u0646");
      await sendMessage(
        env2,
        targetId,
        `\u{1F45B} \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0634\u0645\u0627 ${amount > 0 ? "\u0634\u0627\u0631\u0698" : "\u06A9\u0633\u0631"} \u0634\u062F: ${money(Math.abs(amount))} \u062A\u0648\u0645\u0627\u0646
\u0645\u0648\u062C\u0648\u062F\u06CC \u062C\u062F\u06CC\u062F: <b>${money(balance)} \u062A\u0648\u0645\u0627\u0646</b>`
      );
      await showPanel(env2, chatId, user.id, `\u2705 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F. \u0645\u0648\u062C\u0648\u062F\u06CC \u062C\u062F\u06CC\u062F: ${money(balance)} \u062A\u0648\u0645\u0627\u0646`);
      return true;
    }
    case "a_users": {
      const normalized = toEnDigits(text);
      const m = normalized.match(/^(بن|رفعبن|کاربر)\s+(\d+)$/);
      if (!m) {
        await sendMessage(env2, chatId, "\u274C \u0641\u0631\u0645\u062A \u0627\u0634\u062A\u0628\u0627\u0647\u0647. \u0645\u062B\u0627\u0644: <code>\u0628\u0646 123456789</code>");
        return true;
      }
      const targetId = Number(m[2]);
      const target = await getUser(env2, targetId);
      if (!target) {
        await sendMessage(env2, chatId, "\u274C \u06A9\u0627\u0631\u0628\u0631 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.");
        return true;
      }
      if (m[1] === "\u0628\u0646") {
        await setBanned(env2, targetId, true);
        await clearState(env2, targetId);
        await sendMessage(env2, targetId, "\u26D4\uFE0F \u062F\u0633\u062A\u0631\u0633\u06CC \u0634\u0645\u0627 \u0628\u0647 \u0631\u0628\u0627\u062A \u0645\u0633\u062F\u0648\u062F \u0634\u062F.", {
          reply_markup: { remove_keyboard: true }
        });
        await showPanel(env2, chatId, user.id, `\u26D4\uFE0F \u06A9\u0627\u0631\u0628\u0631 <code>${targetId}</code> \u0645\u0633\u062F\u0648\u062F \u0634\u062F.`);
        return true;
      }
      if (m[1] === "\u0631\u0641\u0639\u0628\u0646") {
        await setBanned(env2, targetId, false);
        await sendMessage(env2, targetId, "\u2705 \u0645\u062D\u062F\u0648\u062F\u06CC\u062A \u062D\u0633\u0627\u0628 \u0634\u0645\u0627 \u0628\u0631\u062F\u0627\u0634\u062A\u0647 \u0634\u062F. /start", {
          reply_markup: mainKeyboard(false)
        });
        await showPanel(env2, chatId, user.id, `\u2705 \u06A9\u0627\u0631\u0628\u0631 <code>${targetId}</code> \u0622\u0632\u0627\u062F \u0634\u062F.`);
        return true;
      }
      const services = await listServices(env2, targetId);
      await sendMessage(
        env2,
        chatId,
        `\u{1F464} <b>\u06A9\u0627\u0631\u0628\u0631 ${targetId}</b>
\u0646\u0627\u0645: ${escapeHtml(target.first_name || "-")}${target.username ? ` (@${target.username})` : ""}
\u{1F45B} \u0645\u0648\u062C\u0648\u062F\u06CC: ${money(target.balance)} \u062A\u0648\u0645\u0627\u0646
\u{1F4E6} \u0633\u0631\u0648\u06CC\u0633\u200C\u0647\u0627: ${toFa(services.length)}
\u{1F381} \u062A\u0633\u062A \u06AF\u0631\u0641\u062A\u0647: ${target.trial_used ? "\u0628\u0644\u0647" : "\u062E\u06CC\u0631"}
\u26D4\uFE0F \u0645\u0633\u062F\u0648\u062F: ${target.banned ? "\u0628\u0644\u0647" : "\u062E\u06CC\u0631"}`,
        { reply_markup: adminKeyboard() }
      );
      return true;
    }
    case "a_delete_service_user": {
      const targetId = Number(toEnDigits(text));
      const target = Number.isFinite(targetId) ? await getUser(env2, targetId) : null;
      if (!target) {
        await sendMessage(env2, chatId, "\u274C \u06A9\u0627\u0631\u0628\u0631 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F\u061B \u0634\u0646\u0627\u0633\u0647 \u062F\u0631\u0633\u062A \u0631\u0648 \u0628\u0641\u0631\u0633\u062A:");
        return true;
      }
      const services = (await listServices(env2, targetId)).filter((s) => s.status === "active");
      if (!services.length) {
        await showPanel(env2, chatId, user.id, "\u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631 \u0633\u0631\u0648\u06CC\u0633 \u0641\u0639\u0627\u0644\u06CC \u0646\u062F\u0627\u0631\u0647.");
        return true;
      }
      await setState(env2, user.id, "a_delete_service_pick", { target_id: targetId });
      await sendMessage(
        env2,
        chatId,
        `\u{1F5D1} \u0633\u0631\u0648\u06CC\u0633 \u0645\u0648\u0631\u062F\u0646\u0638\u0631 \u06A9\u0627\u0631\u0628\u0631 <code>${targetId}</code> \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:`,
        { reply_markup: keyboard([...services.map((s) => [`\u062D\u0630\u0641 \u0633\u0631\u0648\u06CC\u0633 #${s.id}`]), [BTN.cancel]]) }
      );
      return true;
    }
    case "a_delete_service_pick": {
      const match = text.match(/^حذف سرویس #(\d+)$/);
      const service = match ? await getServiceAdmin(env2, Number(match[1])) : null;
      if (!service || service.user_id !== Number(state.data.target_id) || service.status !== "active") {
        await sendMessage(env2, chatId, "\u274C \u0633\u0631\u0648\u06CC\u0633 \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A\u061B \u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u0647\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.");
        return true;
      }
      await deleteService(env2, service.id);
      await sendMessage(env2, service.user_id, `\u{1F5D1} \u0633\u0631\u0648\u06CC\u0633 #${toFa(service.id)} \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0627\u0632 \u062D\u0633\u0627\u0628 \u0634\u0645\u0627 \u062D\u0630\u0641 \u0634\u062F.`);
      await showPanel(env2, chatId, user.id, `\u2705 \u0633\u0631\u0648\u06CC\u0633 #${toFa(service.id)} \u0627\u0632 \u06A9\u0627\u0631\u0628\u0631 <code>${service.user_id}</code> \u062D\u0630\u0641 \u0634\u062F.`);
      return true;
    }
    case "a_broadcast": {
      const users = await allUserIds(env2);
      let sent = 0;
      for (const u of users) {
        const res = await sendMessage(env2, u.id, text);
        if (res && res.ok) sent++;
      }
      await showPanel(env2, chatId, user.id, `\u{1F4E3} \u067E\u06CC\u0627\u0645 \u0628\u0631\u0627\u06CC ${toFa(sent)} \u0646\u0641\u0631 \u0627\u0632 ${toFa(users.length)} \u06A9\u0627\u0631\u0628\u0631 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F.`);
      return true;
    }
    default:
      return false;
  }
}
__name(handleMessage, "handleMessage");
async function handleCallback(env2, query) {
  const data = query.data || "";
  const chatId = query.message ? query.message.chat.id : query.from.id;
  if (!isAdmin(env2, query.from.id)) {
    await answerCallback(env2, query.id, "\u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC", true);
    return;
  }
  const m = data.match(/^(ok|no|bn):(\d+)$/);
  if (!m) {
    await answerCallback(env2, query.id);
    return;
  }
  const order = await getOrder(env2, Number(m[2]));
  if (!order) {
    await answerCallback(env2, query.id, "\u0633\u0641\u0627\u0631\u0634 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F", true);
    return;
  }
  if (order.status !== "pending_review") {
    await answerCallback(env2, query.id, "\u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0642\u0628\u0644\u0627\u064B \u0628\u0631\u0631\u0633\u06CC \u0634\u062F\u0647", true);
    if (query.message) await editReplyMarkup(env2, chatId, query.message.message_id, null);
    return;
  }
  if (m[1] === "ok") {
    await approveOrder(env2, order, query.from.id);
    await answerCallback(env2, query.id, "\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F \u2705");
    await sendMessage(env2, chatId, `\u2705 \u0633\u0641\u0627\u0631\u0634 #${toFa(order.id)} \u062A\u0623\u06CC\u06CC\u062F \u0634\u062F.`);
  } else if (m[1] === "no") {
    await rejectOrder(env2, order, query.from.id, false);
    await answerCallback(env2, query.id, "\u0631\u062F \u0634\u062F \u274C");
    await sendMessage(env2, chatId, `\u274C \u0633\u0641\u0627\u0631\u0634 #${toFa(order.id)} \u0631\u062F \u0634\u062F.`);
  } else {
    await rejectOrder(env2, order, query.from.id, true);
    await answerCallback(env2, query.id, "\u06A9\u0627\u0631\u0628\u0631 \u0628\u0646 \u0634\u062F \u{1F6AB}");
    await sendMessage(
      env2,
      chatId,
      `\u{1F6AB} \u0633\u0641\u0627\u0631\u0634 #${toFa(order.id)} \u0631\u062F \u0648 \u06A9\u0627\u0631\u0628\u0631 <code>${order.user_id}</code> \u0645\u0633\u062F\u0648\u062F \u0634\u062F.`
    );
  }
  if (query.message) await editReplyMarkup(env2, chatId, query.message.message_id, null);
}
__name(handleCallback, "handleCallback");

// src/user.js
var MIN_TOPUP = 1e4;
function backRow() {
  return [BTN.back, BTN.home];
}
__name(backRow, "backRow");
function locationKeyboard() {
  return keyboard([[LOCATIONS.nl.label], [LOCATIONS.us.label], [BTN.home]]);
}
__name(locationKeyboard, "locationKeyboard");
function planKeyboard2(pool) {
  return keyboard([...plansFor(pool).map((p) => [planLabel(p)]), backRow()]);
}
__name(planKeyboard2, "planKeyboard");
function payKeyboard(hasDiscount) {
  const rows = [[BTN.payCard], [BTN.payWallet]];
  if (!hasDiscount) rows.push([BTN.payDiscount]);
  rows.push(backRow());
  return keyboard(rows);
}
__name(payKeyboard, "payKeyboard");
function accountKeyboard() {
  return keyboard([[BTN.topup, BTN.gift], [BTN.txHistory], [BTN.home]]);
}
__name(accountKeyboard, "accountKeyboard");
async function showMain(env2, chatId, userId, text) {
  await clearState(env2, userId);
  await sendMessage(env2, chatId, text || TEXTS.mainMenu, {
    reply_markup: mainKeyboard(isAdmin(env2, userId))
  });
}
__name(showMain, "showMain");
function orderSummary(pool, plan, discount) {
  const final = Math.max(0, plan.price - (discount ? discount.amount : 0));
  let text = `\u{1F9FE} <b>\u067E\u06CC\u0634\u200C\u0641\u0627\u06A9\u062A\u0648\u0631</b>
\u{1F4CD} \u0644\u0648\u06A9\u06CC\u0634\u0646: ${poolLabel(pool)}
\u{1F4E6} \u067E\u0644\u0646: ${escapeHtml(plan.title)}
\u{1F4B0} \u0645\u0628\u0644\u063A: ${money(plan.price)} \u062A\u0648\u0645\u0627\u0646`;
  if (discount) {
    text += `
\u{1F39F} \u06A9\u062F \u062A\u062E\u0641\u06CC\u0641: <code>${escapeHtml(discount.code)}</code> (\u2212${money(discount.amount)} \u062A\u0648\u0645\u0627\u0646)
\u2705 \u0642\u0627\u0628\u0644 \u067E\u0631\u062F\u0627\u062E\u062A: <b>${money(final)} \u062A\u0648\u0645\u0627\u0646</b>`;
  }
  return text + "\n\n\u0631\u0648\u0634 \u067E\u0631\u062F\u0627\u062E\u062A \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646 \u{1F447}";
}
__name(orderSummary, "orderSummary");
function discountAmount(code, price) {
  if (code.kind === "percent") return Math.min(price, Math.floor(price * code.value / 100));
  if (code.kind === "amount") return Math.min(price, code.value);
  return 0;
}
__name(discountAmount, "discountAmount");
async function askReceipt(env2, chatId, order) {
  const card = await cardInfo(env2);
  const cardText = card.number ? `\u{1F4B3} \u0634\u0645\u0627\u0631\u0647 \u06A9\u0627\u0631\u062A:
<code>${escapeHtml(card.number)}</code>` + (card.holder ? `
\u{1F464} \u0628\u0647 \u0646\u0627\u0645: ${escapeHtml(card.holder)}` : "") : "\u26A0\uFE0F \u0634\u0645\u0627\u0631\u0647 \u06A9\u0627\u0631\u062A \u0647\u0646\u0648\u0632 \u062A\u0648\u0633\u0637 \u0627\u062F\u0645\u06CC\u0646 \u062A\u0646\u0638\u06CC\u0645 \u0646\u0634\u062F\u0647\u061B \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631.";
  await sendMessage(
    env2,
    chatId,
    `\u{1F9FE} \u0633\u0641\u0627\u0631\u0634 <b>#${toFa(order.id)}</b> \u062B\u0628\u062A \u0634\u062F.
\u{1F4B0} \u0645\u0628\u0644\u063A \u0642\u0627\u0628\u0644 \u067E\u0631\u062F\u0627\u062E\u062A: <b>${money(order.final_amount)} \u062A\u0648\u0645\u0627\u0646</b>

${cardText}

\u067E\u0633 \u0627\u0632 \u067E\u0631\u062F\u0627\u062E\u062A\u060C <b>\u0639\u06A9\u0633 \u0631\u0633\u06CC\u062F</b> \u0631\u0648 \u0647\u0645\u06CC\u0646\u062C\u0627 \u0628\u0641\u0631\u0633\u062A \u{1F4F8}
\u26A0\uFE0F \u0627\u0631\u0633\u0627\u0644 \u0631\u0633\u06CC\u062F \u062C\u0639\u0644\u06CC \u0628\u0627\u0639\u062B \u0645\u0633\u062F\u0648\u062F \u0634\u062F\u0646 \u062F\u0627\u0626\u0645\u06CC \u062D\u0633\u0627\u0628 \u0645\u06CC\u200C\u0634\u0648\u062F.`,
    { reply_markup: keyboard([[BTN.cancel]]) }
  );
}
__name(askReceipt, "askReceipt");
async function payWithWallet(env2, chatId, user, state) {
  const plan = planById(state.data.plan_id);
  if (!plan) return showMain(env2, chatId, user.id, TEXTS.mainMenu);
  const discount = state.data.discount || null;
  const final = Math.max(0, plan.price - (discount ? discount.amount : 0));
  const fresh = await getUser(env2, user.id);
  if ((fresh.balance || 0) < final) {
    await sendMessage(
      env2,
      chatId,
      `\u26A0\uFE0F \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06A9\u0627\u0641\u06CC \u0646\u06CC\u0633\u062A.
\u{1F45B} \u0645\u0648\u062C\u0648\u062F\u06CC \u0641\u0639\u0644\u06CC: ${money(fresh.balance)} \u062A\u0648\u0645\u0627\u0646
\u{1F4B0} \u0645\u0648\u0631\u062F \u0646\u06CC\u0627\u0632: ${money(final)} \u062A\u0648\u0645\u0627\u0646

\u0645\u06CC\u200C\u062A\u0648\u0646\u06CC \u0627\u0632 \u0628\u062E\u0634 \xAB${BTN.account}\xBB \u06A9\u06CC\u0641 \u067E\u0648\u0644\u062A \u0631\u0648 \u0634\u0627\u0631\u0698 \u06A9\u0646\u06CC.`
    );
    return;
  }
  if (discount) {
    const ok = await consumeCode(env2, discount.code, user.id, null);
    if (!ok) {
      await sendMessage(env2, chatId, "\u26A0\uFE0F \u0627\u0639\u062A\u0628\u0627\u0631 \u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062A\u0645\u0627\u0645 \u0634\u062F.");
      return;
    }
  }
  const paid = await spendBalance(env2, user.id, final, `\u062E\u0631\u06CC\u062F ${plan.title}`);
  if (!paid) {
    if (discount) await releaseCode(env2, discount.code, null);
    await sendMessage(env2, chatId, "\u26A0\uFE0F \u06A9\u0633\u0631 \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0627\u0646\u062C\u0627\u0645 \u0646\u0634\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.");
    return;
  }
  const order = await createOrder(env2, {
    user_id: user.id,
    kind: state.data.renew_service_id ? "renew" : "service",
    pool: state.data.pool,
    plan_id: plan.id,
    renew_service_id: state.data.renew_service_id || null,
    amount: plan.price,
    discount_code: discount ? discount.code : null,
    discount_value: discount ? discount.amount : 0,
    final_amount: final,
    method: "wallet",
    status: "approved"
  });
  await clearState(env2, user.id);
  await sendMessage(env2, chatId, "\u2705 \u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F. \u062F\u0631 \u062D\u0627\u0644 \u062A\u062D\u0648\u06CC\u0644 \u0633\u0631\u0648\u06CC\u0633... \u23F3", {
    reply_markup: mainKeyboard(isAdmin(env2, user.id))
  });
  await deliverOrder(env2, order);
}
__name(payWithWallet, "payWithWallet");
async function payWithCard(env2, chatId, user, state) {
  const plan = planById(state.data.plan_id);
  if (!plan) return showMain(env2, chatId, user.id, TEXTS.mainMenu);
  const discount = state.data.discount || null;
  const final = Math.max(0, plan.price - (discount ? discount.amount : 0));
  if (discount) {
    const ok = await consumeCode(env2, discount.code, user.id, null);
    if (!ok) {
      await sendMessage(env2, chatId, "\u26A0\uFE0F \u0627\u0639\u062A\u0628\u0627\u0631 \u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062A\u0645\u0627\u0645 \u0634\u062F.");
      return;
    }
  }
  const order = await createOrder(env2, {
    user_id: user.id,
    kind: state.data.renew_service_id ? "renew" : "service",
    pool: state.data.pool,
    plan_id: plan.id,
    renew_service_id: state.data.renew_service_id || null,
    amount: plan.price,
    discount_code: discount ? discount.code : null,
    discount_value: discount ? discount.amount : 0,
    final_amount: final,
    method: "card",
    status: "awaiting_receipt"
  });
  await setState(env2, user.id, "wait_receipt", { order_id: order.id });
  await askReceipt(env2, chatId, order);
}
__name(payWithCard, "payWithCard");
async function giveTrial(env2, chatId, user) {
  const fresh = await getUser(env2, user.id);
  if (fresh.trial_used) {
    await sendMessage(env2, chatId, "\u26A0\uFE0F \u0634\u0645\u0627 \u0642\u0628\u0644\u0627\u064B \u0627\u06A9\u0627\u0646\u062A \u062A\u0633\u062A \u062F\u0631\u06CC\u0627\u0641\u062A \u06A9\u0631\u062F\u06CC. \u0647\u0631 \u06A9\u0627\u0631\u0628\u0631 \u0641\u0642\u0637 \u06CC\u06A9 \u0628\u0627\u0631 \u0645\u06CC\u200C\u062A\u0648\u0646\u0647 \u062A\u0633\u062A \u0628\u06AF\u06CC\u0631\u0647.", {
      reply_markup: mainKeyboard(isAdmin(env2, user.id))
    });
    return;
  }
  const link = await takeLink(env2, TRIAL.pool, user.id, null);
  if (!link) {
    await sendMessage(
      env2,
      chatId,
      "\u{1F613} \u0645\u0648\u062C\u0648\u062F\u06CC \u0627\u06A9\u0627\u0646\u062A \u062A\u0633\u062A \u0641\u0639\u0644\u0627\u064B \u062A\u0645\u0648\u0645 \u0634\u062F\u0647. \u0644\u0637\u0641\u0627\u064B \u0628\u0639\u062F\u0627\u064B \u062F\u0648\u0628\u0627\u0631\u0647 \u0645\u0631\u0627\u062C\u0639\u0647 \u06A9\u0646 \u{1F64F}",
      { reply_markup: mainKeyboard(isAdmin(env2, user.id)) }
    );
    await notifyAdmins(env2, "\u{1F6A8} \u0628\u0627\u0646\u06A9 \u0644\u06CC\u0646\u06A9 \u0627\u06A9\u0627\u0646\u062A \u062A\u0633\u062A \u062E\u0627\u0644\u06CC \u0627\u0633\u062A!");
    return;
  }
  const started = /* @__PURE__ */ new Date();
  const service = await createService(env2, {
    user_id: user.id,
    order_id: null,
    link_id: link.id,
    url: link.url,
    pool: TRIAL.pool,
    plan_id: null,
    plan_title: TRIAL.title,
    volume: TRIAL.volume,
    days: TRIAL.days,
    is_trial: 1,
    started_at: started.toISOString(),
    expires_at: addDays(started, TRIAL.days).toISOString()
  });
  await markTrialUsed(env2, user.id);
  await clearState(env2, user.id);
  const subscription = await tryLoadSubscription(service.url);
  await sendMessage(
    env2,
    chatId,
    `\u{1F381} \u0627\u06A9\u0627\u0646\u062A \u062A\u0633\u062A \u0641\u0639\u0627\u0644 \u0634\u062F!
\u062D\u062C\u0645: ${TRIAL.volume} | \u0645\u062F\u062A: ${toFa(TRIAL.days)} \u0631\u0648\u0632

${serviceCard(service, subscription)}`,
    { reply_markup: mainKeyboard(isAdmin(env2, user.id)) }
  );
  await sendQr(env2, chatId, subscriptionClientUrl(service.url), `\u{1F533} QR \u0627\u06A9\u0627\u0646\u062A \u062A\u0633\u062A #${toFa(service.id)}`);
  await sendGuidePrompt(env2, chatId, service.id);
}
__name(giveTrial, "giveTrial");
async function showServices(env2, chatId, user) {
  const services = (await listServices(env2, user.id)).filter((s) => s.status === "active");
  if (!services.length) {
    await showMain(env2, chatId, user.id, `\u{1F4E6} \u0647\u0646\u0648\u0632 \u0633\u0631\u0648\u06CC\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC. \u0627\u0632 \xAB${BTN.buy}\xBB \u0634\u0631\u0648\u0639 \u06A9\u0646.`);
    return;
  }
  const subscriptions = await Promise.all(services.map((service) => tryLoadSubscription(service.url)));
  const text = services.map(
    (s, index) => {
      const info3 = subscriptions[index];
      const usage = info3 ? `
   \u{1F4BE} ${usageLines(info3).split("\n").slice(0, 2).join("\n   ")}` : `
   \u{1F4BE} \u062D\u062C\u0645 \u067E\u0644\u0646: ${escapeHtml(s.volume)} \u2014 \u26A0\uFE0F \u0622\u0645\u0627\u0631 \u0622\u0646\u0644\u0627\u06CC\u0646 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A`;
      return `${toFa(index + 1)}. <b>\u0633\u0631\u0648\u06CC\u0633 #${toFa(s.id)}</b> \u2014 ${poolLabel(s.pool)} \u2014 ${escapeHtml(s.plan_title)}${usage}`;
    }
  ).join("\n");
  const rows = services.map((s, index) => [`\u{1F4E6} \u0633\u0631\u0648\u06CC\u0633 ${toFa(index + 1)}`]);
  rows.push([BTN.home]);
  await setState(env2, user.id, "services", {});
  await sendMessage(env2, chatId, `\u{1F4E6} <b>\u0633\u0631\u0648\u06CC\u0633\u200C\u0647\u0627\u06CC \u0645\u0646</b>

${text}

\u0628\u0631\u0627\u06CC \u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u0645\u0646\u0648\u06CC \u0647\u0631 \u0633\u0631\u0648\u06CC\u0633\u060C \u0631\u0648\u06CC \u062F\u06A9\u0645\u0647\u200C\u0627\u0634 \u0628\u0632\u0646:`, {
    reply_markup: keyboard(rows)
  });
}
__name(showServices, "showServices");
function serviceMenuKeyboard() {
  return keyboard([
    ["\u{1F4CA} \u0645\u0634\u0627\u0647\u062F\u0647 \u062D\u062C\u0645", "\u{1F9E9} \u06A9\u0627\u0646\u0641\u06CC\u06AF\u200C\u0647\u0627\u06CC \u062A\u06A9\u06CC"],
    ["\u{1F533} \u062F\u0631\u06CC\u0627\u0641\u062A QR", "\u{1F4DA} \u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u0627\u062A\u0635\u0627\u0644"],
    ["\u267B\uFE0F \u062A\u0645\u062F\u06CC\u062F \u0627\u06CC\u0646 \u0633\u0631\u0648\u06CC\u0633"],
    [BTN.back, BTN.home]
  ]);
}
__name(serviceMenuKeyboard, "serviceMenuKeyboard");
async function openServiceMenu(env2, chatId, user, serviceId) {
  const service = await getService(env2, serviceId, user.id);
  if (!service || service.status !== "active") {
    await sendMessage(env2, chatId, "\u274C \u0633\u0631\u0648\u06CC\u0633 \u0641\u0639\u0627\u0644 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.");
    return;
  }
  const subscription = await tryLoadSubscription(service.url);
  await setState(env2, user.id, "service_menu", { service_id: service.id });
  await sendMessage(env2, chatId, `\u{1F4E6} <b>\u0645\u0646\u0648\u06CC \u0633\u0631\u0648\u06CC\u0633 #${toFa(service.id)}</b>

${serviceCard(service, subscription)}`, {
    reply_markup: serviceMenuKeyboard()
  });
}
__name(openServiceMenu, "openServiceMenu");
async function sendServiceQr(env2, chatId, user, serviceId) {
  const service = await getService(env2, serviceId, user.id);
  if (!service) {
    await sendMessage(env2, chatId, "\u274C \u0633\u0631\u0648\u06CC\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.");
    return;
  }
  await sendQr(env2, chatId, subscriptionClientUrl(service.url), `\u{1F533} QR \u0633\u0631\u0648\u06CC\u0633 #${toFa(service.id)}`);
}
__name(sendServiceQr, "sendServiceQr");
async function sendServiceUsage(env2, chatId, user, serviceId) {
  const service = await getService(env2, serviceId, user.id);
  if (!service) return sendMessage(env2, chatId, "\u274C \u0633\u0631\u0648\u06CC\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.");
  try {
    const info3 = await loadSubscription(service.url);
    const expiry = info3.expiresAt ? toFa(String(info3.expiresAt).slice(0, 10)) : "\u0646\u0627\u0645\u0634\u062E\u0635";
    await sendMessage(
      env2,
      chatId,
      `\u{1F4CA} <b>\u06AF\u0632\u0627\u0631\u0634 \u0644\u062D\u0638\u0647\u200C\u0627\u06CC \u0633\u0631\u0648\u06CC\u0633 #${toFa(service.id)}</b>

${usageLines(info3)}
\u{1F9E9} \u062A\u0639\u062F\u0627\u062F \u06A9\u0627\u0646\u0641\u06CC\u06AF\u200C\u0647\u0627: ${toFa(info3.links.length)}
\u{1F4C5} \u0646\u0632\u062F\u06CC\u06A9\u200C\u062A\u0631\u06CC\u0646 \u0627\u0646\u0642\u0636\u0627: ${expiry}`
    );
  } catch (error3) {
    console.log("SERVICE_USAGE_ERROR", String(error3));
    await sendMessage(env2, chatId, "\u26A0\uFE0F \u062F\u0631\u06CC\u0627\u0641\u062A \u0622\u0645\u0627\u0631 \u0622\u0646\u0644\u0627\u06CC\u0646 \u0627\u06CC\u0646 \u0633\u0631\u0648\u06CC\u0633 \u0645\u0645\u06A9\u0646 \u0646\u0634\u062F. \u0686\u0646\u062F \u0644\u062D\u0638\u0647\u200C\u06CC \u062F\u06CC\u06AF\u0647 \u062F\u0648\u0628\u0627\u0631\u0647 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646.");
  }
}
__name(sendServiceUsage, "sendServiceUsage");
async function sendServiceConfigs(env2, chatId, user, serviceId) {
  const service = await getService(env2, serviceId, user.id);
  if (!service) return sendMessage(env2, chatId, "\u274C \u0633\u0631\u0648\u06CC\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.");
  try {
    const info3 = await loadSubscription(service.url);
    if (!info3.links.length) {
      await sendMessage(env2, chatId, "\u26A0\uFE0F \u06A9\u0627\u0646\u0641\u06CC\u06AF \u062A\u06A9\u06CC \u0641\u0639\u0627\u0644\u06CC \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0633\u0631\u0648\u06CC\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.");
      return;
    }
    await sendMessage(
      env2,
      chatId,
      `\u{1F9E9} <b>\u06A9\u0627\u0646\u0641\u06CC\u06AF\u200C\u0647\u0627\u06CC \u062A\u06A9\u06CC \u0633\u0631\u0648\u06CC\u0633 #${toFa(service.id)}</b>
\u062A\u0639\u062F\u0627\u062F: ${toFa(info3.links.length)} \u2014 \u0647\u0631 \u06A9\u0627\u0646\u0641\u06CC\u06AF \u062F\u0631 \u067E\u06CC\u0627\u0645 \u062C\u062F\u0627 \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.`
    );
    for (const link of info3.links) await sendMessage(env2, chatId, configCard(link));
  } catch (error3) {
    console.log("SERVICE_CONFIGS_ERROR", String(error3));
    await sendMessage(env2, chatId, "\u26A0\uFE0F \u062F\u0631\u06CC\u0627\u0641\u062A \u06A9\u0627\u0646\u0641\u06CC\u06AF\u200C\u0647\u0627\u06CC \u062A\u06A9\u06CC \u0645\u0645\u06A9\u0646 \u0646\u0634\u062F. \u0644\u06CC\u0646\u06A9 \u0627\u0634\u062A\u0631\u0627\u06A9 \u06CC\u0627 API \u0631\u0648 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.");
  }
}
__name(sendServiceConfigs, "sendServiceConfigs");
async function askGuide(env2, chatId, user, serviceId) {
  const service = await getService(env2, serviceId, user.id);
  if (!service) {
    await sendMessage(env2, chatId, "\u274C \u0633\u0631\u0648\u06CC\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.");
    return;
  }
  await sendGuidePrompt(env2, chatId, service.id);
}
__name(askGuide, "askGuide");
async function handleGuideCallback(env2, query) {
  const data = String(query.data || "");
  const parts = data.split(":");
  const action = parts[1];
  const serviceId = Number(parts[2]);
  const chatId = query.message ? query.message.chat.id : query.from.id;
  const messageId = query.message ? query.message.message_id : null;
  const service = await getService(env2, serviceId, query.from.id);
  if (!service) {
    await answerCallback(env2, query.id, "\u274C \u0633\u0631\u0648\u06CC\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.", true);
    return;
  }
  if (action === "menu") {
    await answerCallback(env2, query.id);
    if (messageId) {
      await editMessageText(env2, chatId, messageId, GUIDE_INTRO, {
        reply_markup: guideKeyboard(service.id)
      });
    } else {
      await sendGuidePrompt(env2, chatId, service.id);
    }
    return;
  }
  if (action === "qr") {
    await answerCallback(env2, query.id, "\u{1F533} \u062F\u0631 \u062D\u0627\u0644 \u0627\u0631\u0633\u0627\u0644 QR...");
    await sendQr(env2, chatId, subscriptionClientUrl(service.url), `\u{1F533} QR \u0633\u0631\u0648\u06CC\u0633 #${toFa(service.id)}`);
    return;
  }
  const body = guideText(action, subscriptionClientUrl(service.url));
  if (!body) {
    await answerCallback(env2, query.id, "\u274C \u062F\u0633\u062A\u06AF\u0627\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A.", true);
    return;
  }
  await answerCallback(env2, query.id);
  if (messageId) {
    await editMessageText(env2, chatId, messageId, body, {
      reply_markup: guideBackKeyboard(service.id)
    });
  } else {
    await sendMessage(env2, chatId, body, { reply_markup: guideBackKeyboard(service.id) });
  }
}
__name(handleGuideCallback, "handleGuideCallback");
async function startRenew(env2, chatId, user) {
  const services = (await listServices(env2, user.id)).filter(
    (s) => s.status === "active" && !s.is_trial
  );
  if (!services.length) {
    await showMain(env2, chatId, user.id, "\u{1F504} \u0633\u0631\u0648\u06CC\u0633 \u0641\u0639\u0627\u0644\u06CC \u0628\u0631\u0627\u06CC \u062A\u0645\u062F\u06CC\u062F \u0646\u062F\u0627\u0631\u06CC.");
    return;
  }
  const lines = services.map(
    (s) => `\u2022 #${toFa(s.id)} \u2014 ${poolLabel(s.pool)} \u2014 ${escapeHtml(s.plan_title)}`
  );
  const rows = services.map((s) => [`\u267B\uFE0F \u062A\u0645\u062F\u06CC\u062F #${s.id}`]);
  rows.push([BTN.home]);
  await setState(env2, user.id, "renew_pick", {});
  await sendMessage(
    env2,
    chatId,
    `\u{1F504} \u06A9\u062F\u0648\u0645 \u0633\u0631\u0648\u06CC\u0633 \u0631\u0648 \u0645\u06CC\u200C\u062E\u0648\u0627\u06CC \u062A\u0645\u062F\u06CC\u062F \u06A9\u0646\u06CC\u061F

${lines.join("\n")}

\u26A0\uFE0F \u067E\u0633 \u0627\u0632 \u062A\u0645\u062F\u06CC\u062F\u060C \u06CC\u06A9 \u0644\u06CC\u0646\u06A9 \u062C\u062F\u06CC\u062F \u0628\u0647\u062A \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0647 \u0648 \u0644\u06CC\u0646\u06A9 \u0642\u0628\u0644\u06CC \u0628\u0627\u06CC\u06AF\u0627\u0646\u06CC \u0645\u06CC\u200C\u0634\u0647.`,
    { reply_markup: keyboard(rows) }
  );
}
__name(startRenew, "startRenew");
async function pickRenewService(env2, chatId, user, serviceId) {
  const service = await getService(env2, serviceId, user.id);
  if (!service || service.is_trial) {
    await sendMessage(env2, chatId, "\u274C \u0633\u0631\u0648\u06CC\u0633 \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A.");
    return;
  }
  await setState(env2, user.id, "buy_plan", {
    pool: service.pool,
    renew_service_id: service.id
  });
  await sendMessage(
    env2,
    chatId,
    `\u{1F504} \u062A\u0645\u062F\u06CC\u062F \u0633\u0631\u0648\u06CC\u0633 #${toFa(service.id)} (${poolLabel(service.pool)})
\u067E\u0644\u0646 \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:`,
    { reply_markup: planKeyboard2(service.pool) }
  );
}
__name(pickRenewService, "pickRenewService");
async function showAccount(env2, chatId, user) {
  const fresh = await getUser(env2, user.id);
  const row = await one(
    env2,
    `SELECT COUNT(*) AS c FROM services WHERE user_id = ? AND is_trial = 0`,
    [user.id]
  );
  await setState(env2, user.id, "account", {});
  await sendMessage(
    env2,
    chatId,
    `\u{1F464} <b>\u062D\u0633\u0627\u0628 \u0645\u0646</b>

\u{1F194} \u0634\u0646\u0627\u0633\u0647: <code>${user.id}</code>
\u{1F45B} \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644: <b>${money(fresh.balance)} \u062A\u0648\u0645\u0627\u0646</b>
\u{1F4E6} \u062A\u0639\u062F\u0627\u062F \u0633\u0631\u0648\u06CC\u0633\u200C\u0647\u0627: ${toFa(row ? row.c : 0)}`,
    { reply_markup: accountKeyboard() }
  );
}
__name(showAccount, "showAccount");
async function showTransactions(env2, chatId, user) {
  const rows = await all(
    env2,
    `SELECT * FROM wallet_tx WHERE user_id = ? ORDER BY id DESC LIMIT 15`,
    [user.id]
  );
  if (!rows.length) {
    await sendMessage(env2, chatId, "\u{1F9FE} \u0647\u0646\u0648\u0632 \u062A\u0631\u0627\u06A9\u0646\u0634\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647.", {
      reply_markup: accountKeyboard()
    });
    return;
  }
  const lines = rows.map((tx) => {
    const sign = tx.amount >= 0 ? "\u2795" : "\u2796";
    return `${sign} ${money(Math.abs(tx.amount))} \u062A\u0648\u0645\u0627\u0646 \u2014 ${escapeHtml(tx.note || tx.kind)} (${toFa(String(tx.created_at).slice(0, 10))})`;
  });
  await sendMessage(env2, chatId, `\u{1F9FE} <b>\u0622\u062E\u0631\u06CC\u0646 \u062A\u0631\u0627\u06A9\u0646\u0634\u200C\u0647\u0627</b>

${lines.join("\n")}`, {
    reply_markup: accountKeyboard()
  });
}
__name(showTransactions, "showTransactions");
async function handleMessage2(env2, message, user) {
  const chatId = message.chat.id;
  const text = (message.text || "").trim();
  const state = await getState(env2, user.id);
  if (state.step === "wait_receipt" && (message.photo || message.document)) {
    const order = await getOrder(env2, state.data.order_id);
    if (!order || order.user_id !== user.id) {
      await showMain(env2, chatId, user.id, "\u0633\u0641\u0627\u0631\u0634 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0627\u0632 \u0627\u0648\u0644 \u0634\u0631\u0648\u0639 \u06A9\u0646.");
      return;
    }
    const fileId = message.photo ? message.photo[message.photo.length - 1].file_id : message.document.file_id;
    await updateOrder(env2, order.id, {
      status: "pending_review",
      receipt_file_id: fileId,
      receipt_chat_id: chatId,
      receipt_message_id: message.message_id
    });
    await clearState(env2, user.id);
    await sendMessage(
      env2,
      chatId,
      "\u2705 \u0631\u0633\u06CC\u062F \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F \u0648 \u0628\u0631\u0627\u06CC \u0628\u0631\u0631\u0633\u06CC \u0628\u0647 \u0627\u062F\u0645\u06CC\u0646 \u0631\u0641\u062A.\n\u0646\u062A\u06CC\u062C\u0647 \u0631\u0648 \u0647\u0645\u06CC\u0646\u062C\u0627 \u0628\u0647\u062A \u0627\u0637\u0644\u0627\u0639 \u0645\u06CC\u200C\u062F\u06CC\u0645 \u{1F64F}",
      { reply_markup: mainKeyboard(isAdmin(env2, user.id)) }
    );
    const fresh = await getOrder(env2, order.id);
    await sendReceiptToAdmins(env2, fresh, user, message);
    return;
  }
  if (state.step === "support" && text !== BTN.home && text !== BTN.back) {
    const who = user.username ? `@${user.username}` : escapeHtml(user.first_name || "\u06A9\u0627\u0631\u0628\u0631");
    await notifyAdmins(
      env2,
      `\u{1F4AC} <b>\u067E\u06CC\u0627\u0645 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC</b>
\u0627\u0632: ${who} (<code>${user.id}</code>)
\u0628\u0631\u0627\u06CC \u067E\u0627\u0633\u062E: <code>\u067E\u0627\u0633\u062E ${user.id} \u0645\u062A\u0646 \u067E\u06CC\u0627\u0645</code>`
    );
    for (const adminId of adminIds(env2)) {
      await copyMessage(env2, adminId, chatId, message.message_id);
    }
    await showMain(env2, chatId, user.id, "\u2705 \u067E\u06CC\u0627\u0645\u062A \u0628\u0631\u0627\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0627\u0631\u0633\u0627\u0644 \u0634\u062F.");
    return;
  }
  if (!text) {
    await sendMessage(env2, chatId, TEXTS.unknown, {
      reply_markup: mainKeyboard(isAdmin(env2, user.id))
    });
    return;
  }
  if (text === "/start" || text === BTN.home || text === BTN.cancel) {
    await showMain(
      env2,
      chatId,
      user.id,
      text === "/start" ? TEXTS.welcome(user.first_name) : TEXTS.mainMenu
    );
    return;
  }
  if (text === BTN.back) {
    await handleBack(env2, chatId, user, state);
    return;
  }
  switch (text) {
    case BTN.buy:
      await setState(env2, user.id, "buy_location", {});
      await sendMessage(env2, chatId, "\u{1F4CD} \u0627\u0648\u0644 \u0644\u0648\u06A9\u06CC\u0634\u0646 \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:", {
        reply_markup: locationKeyboard()
      });
      return;
    case BTN.myServices:
      await showServices(env2, chatId, user);
      return;
    case BTN.renew:
      await startRenew(env2, chatId, user);
      return;
    case BTN.account:
      await showAccount(env2, chatId, user);
      return;
    case BTN.trial:
      await giveTrial(env2, chatId, user);
      return;
    case BTN.support:
      await setState(env2, user.id, "support", {});
      await sendMessage(env2, chatId, "\u{1F4AC} \u067E\u06CC\u0627\u0645\u062A \u0631\u0648 \u0628\u0646\u0648\u06CC\u0633 (\u0645\u062A\u0646 \u06CC\u0627 \u0639\u06A9\u0633) \u062A\u0627 \u0628\u0631\u0627\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0628\u0641\u0631\u0633\u062A\u06CC\u0645:", {
        reply_markup: keyboard([[BTN.home]])
      });
      return;
    case BTN.topup:
      await setState(env2, user.id, "topup_amount", {});
      await sendMessage(
        env2,
        chatId,
        `\u{1F4B0} \u0645\u0628\u0644\u063A \u0634\u0627\u0631\u0698 \u0631\u0648 \u0628\u0647 \u062A\u0648\u0645\u0627\u0646 \u0628\u0641\u0631\u0633\u062A (\u062D\u062F\u0627\u0642\u0644 ${money(MIN_TOPUP)} \u062A\u0648\u0645\u0627\u0646):`,
        { reply_markup: keyboard([backRow()]) }
      );
      return;
    case BTN.gift:
      await setState(env2, user.id, "gift_code", {});
      await sendMessage(env2, chatId, "\u{1F381} \u06A9\u062F \u0647\u062F\u06CC\u0647 \u0631\u0648 \u0628\u0641\u0631\u0633\u062A:", {
        reply_markup: keyboard([backRow()])
      });
      return;
    case BTN.txHistory:
      await showTransactions(env2, chatId, user);
      return;
    default:
      break;
  }
  const qrMatch = text.match(/^🔳 QR #(\d+)$/);
  if (qrMatch) {
    await sendServiceQr(env2, chatId, user, Number(qrMatch[1]));
    return;
  }
  const serviceMatch = text.match(/^📦 سرویس ([۰-۹0-9]+)$/);
  if (serviceMatch) {
    const index = Number(toEnDigits(serviceMatch[1])) - 1;
    const services = (await listServices(env2, user.id)).filter((s) => s.status === "active");
    const selected = services[index];
    if (!selected) await sendMessage(env2, chatId, "\u274C \u0633\u0631\u0648\u06CC\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F\u061B \u062F\u0648\u0628\u0627\u0631\u0647 \u0627\u0632 \xAB\u0633\u0631\u0648\u06CC\u0633\u200C\u0647\u0627\u06CC \u0645\u0646\xBB \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.");
    else await openServiceMenu(env2, chatId, user, selected.id);
    return;
  }
  const guideMatch = text.match(/^📚 راهنما #(\d+)$/);
  if (guideMatch) {
    await askGuide(env2, chatId, user, Number(guideMatch[1]));
    return;
  }
  const usageMatch = text.match(/^📊 حجم #(\d+)$/);
  if (usageMatch) {
    await sendServiceUsage(env2, chatId, user, Number(usageMatch[1]));
    return;
  }
  const configsMatch = text.match(/^🧩 کانفیگ‌ها #(\d+)$/);
  if (configsMatch) {
    await sendServiceConfigs(env2, chatId, user, Number(configsMatch[1]));
    return;
  }
  const renewMatch = text.match(/^♻️ تمدید #(\d+)$/);
  if (renewMatch) {
    await pickRenewService(env2, chatId, user, Number(renewMatch[1]));
    return;
  }
  if (state.step === "service_menu") {
    const serviceId = Number(state.data.service_id);
    if (text === "\u{1F4CA} \u0645\u0634\u0627\u0647\u062F\u0647 \u062D\u062C\u0645") return sendServiceUsage(env2, chatId, user, serviceId);
    if (text === "\u{1F9E9} \u06A9\u0627\u0646\u0641\u06CC\u06AF\u200C\u0647\u0627\u06CC \u062A\u06A9\u06CC") return sendServiceConfigs(env2, chatId, user, serviceId);
    if (text === "\u{1F533} \u062F\u0631\u06CC\u0627\u0641\u062A QR") return sendServiceQr(env2, chatId, user, serviceId);
    if (text === "\u{1F4DA} \u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u0627\u062A\u0635\u0627\u0644") return askGuide(env2, chatId, user, serviceId);
    if (text === "\u267B\uFE0F \u062A\u0645\u062F\u06CC\u062F \u0627\u06CC\u0646 \u0633\u0631\u0648\u06CC\u0633") return pickRenewService(env2, chatId, user, serviceId);
  }
  switch (state.step) {
    case "buy_location": {
      const loc = Object.values(LOCATIONS).find((l) => l.label === text);
      if (!loc) {
        await sendMessage(env2, chatId, "\u0644\u0637\u0641\u0627\u064B \u06CC\u06A9\u06CC \u0627\u0632 \u062F\u0648 \u0644\u0648\u06A9\u06CC\u0634\u0646 \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:", {
          reply_markup: locationKeyboard()
        });
        return;
      }
      await setState(env2, user.id, "buy_plan", { pool: loc.key });
      await sendMessage(env2, chatId, `\u{1F4E6} \u067E\u0644\u0646 \u0645\u0648\u0631\u062F \u0646\u0638\u0631 \u0631\u0648 \u0628\u0631\u0627\u06CC ${loc.label} \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:`, {
        reply_markup: planKeyboard2(loc.key)
      });
      return;
    }
    case "buy_plan": {
      const plan = planByLabel(state.data.pool, text);
      if (!plan) {
        await sendMessage(env2, chatId, "\u0644\u0637\u0641\u0627\u064B \u06CC\u06A9\u06CC \u0627\u0632 \u067E\u0644\u0646\u200C\u0647\u0627\u06CC \u0632\u06CC\u0631 \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:", {
          reply_markup: planKeyboard2(state.data.pool)
        });
        return;
      }
      const data = { ...state.data, plan_id: plan.id };
      await setState(env2, user.id, "buy_pay", data);
      await sendMessage(env2, chatId, orderSummary(data.pool, plan, data.discount), {
        reply_markup: payKeyboard(Boolean(data.discount))
      });
      return;
    }
    case "buy_pay": {
      if (text === BTN.payCard) return payWithCard(env2, chatId, user, state);
      if (text === BTN.payWallet) return payWithWallet(env2, chatId, user, state);
      if (text === BTN.payDiscount) {
        await setState(env2, user.id, "buy_code", state.data);
        await sendMessage(env2, chatId, "\u{1F39F} \u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u0631\u0648 \u0628\u0641\u0631\u0633\u062A:", {
          reply_markup: keyboard([backRow()])
        });
        return;
      }
      await sendMessage(env2, chatId, "\u0644\u0637\u0641\u0627\u064B \u0631\u0648\u0634 \u067E\u0631\u062F\u0627\u062E\u062A \u0631\u0648 \u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u0647\u0627\u06CC \u067E\u0627\u06CC\u06CC\u0646 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:", {
        reply_markup: payKeyboard(Boolean(state.data.discount))
      });
      return;
    }
    case "buy_code": {
      const plan = planById(state.data.plan_id);
      if (!plan) return showMain(env2, chatId, user.id, TEXTS.mainMenu);
      const code = await getCode(env2, toEnDigits(text).toUpperCase());
      if (!code || !code.active || code.kind === "gift" || code.used >= code.max_uses) {
        await sendMessage(env2, chatId, "\u274C \u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A \u06CC\u0627 \u0638\u0631\u0641\u06CC\u062A\u0634 \u062A\u0645\u0648\u0645 \u0634\u062F\u0647. \u062F\u0648\u0628\u0627\u0631\u0647 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646:");
        return;
      }
      if (await codeUsedByUser(env2, code.code, user.id)) {
        await sendMessage(env2, chatId, "\u274C \u0627\u06CC\u0646 \u06A9\u062F \u0642\u0628\u0644\u0627\u064B \u062A\u0648\u0633\u0637 \u062E\u0648\u062F\u062A \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0634\u062F\u0647.");
        return;
      }
      const amount = discountAmount(code, plan.price);
      const data = { ...state.data, discount: { code: code.code, amount } };
      const final = Math.max(0, plan.price - amount);
      if (final === 0) {
        const ok = await consumeCode(env2, code.code, user.id, null);
        if (!ok) {
          await sendMessage(env2, chatId, "\u26A0\uFE0F \u0638\u0631\u0641\u06CC\u062A \u06A9\u062F \u062A\u0645\u0627\u0645 \u0634\u062F.");
          return;
        }
        const order = await createOrder(env2, {
          user_id: user.id,
          kind: data.renew_service_id ? "renew" : "service",
          pool: data.pool,
          plan_id: plan.id,
          renew_service_id: data.renew_service_id || null,
          amount: plan.price,
          discount_code: code.code,
          discount_value: amount,
          final_amount: 0,
          method: "discount",
          status: "approved"
        });
        await clearState(env2, user.id);
        await sendMessage(env2, chatId, "\u{1F389} \u06A9\u062F \u06F1\u06F0\u06F0\u066A \u0628\u0648\u062F! \u062F\u0631 \u062D\u0627\u0644 \u062A\u062D\u0648\u06CC\u0644 \u0633\u0631\u0648\u06CC\u0633... \u23F3", {
          reply_markup: mainKeyboard(isAdmin(env2, user.id))
        });
        await deliverOrder(env2, order);
        return;
      }
      await setState(env2, user.id, "buy_pay", data);
      await sendMessage(
        env2,
        chatId,
        `\u2705 \u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F.

${orderSummary(data.pool, plan, data.discount)}`,
        { reply_markup: payKeyboard(true) }
      );
      return;
    }
    case "topup_amount": {
      const amount = parseAmount(text);
      if (amount === null || amount < MIN_TOPUP) {
        await sendMessage(
          env2,
          chatId,
          `\u274C \u0645\u0628\u0644\u063A \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A. \u062D\u062F\u0627\u0642\u0644 ${money(MIN_TOPUP)} \u062A\u0648\u0645\u0627\u0646 \u0631\u0648 \u0628\u0647 \u0639\u062F\u062F \u0628\u0641\u0631\u0633\u062A.`
        );
        return;
      }
      const order = await createOrder(env2, {
        user_id: user.id,
        kind: "topup",
        amount,
        final_amount: amount,
        method: "card",
        status: "awaiting_receipt"
      });
      await setState(env2, user.id, "wait_receipt", { order_id: order.id });
      await askReceipt(env2, chatId, order);
      return;
    }
    case "gift_code": {
      const code = await getCode(env2, toEnDigits(text).toUpperCase());
      if (!code || !code.active || code.kind !== "gift" || code.used >= code.max_uses) {
        await sendMessage(env2, chatId, "\u274C \u06A9\u062F \u0647\u062F\u06CC\u0647 \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A \u06CC\u0627 \u0638\u0631\u0641\u06CC\u062A\u0634 \u062A\u0645\u0648\u0645 \u0634\u062F\u0647.");
        return;
      }
      if (await codeUsedByUser(env2, code.code, user.id)) {
        await sendMessage(env2, chatId, "\u274C \u0627\u06CC\u0646 \u06A9\u062F \u0642\u0628\u0644\u0627\u064B \u062A\u0648\u0633\u0637 \u062E\u0648\u062F\u062A \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0634\u062F\u0647.");
        return;
      }
      const ok = await consumeCode(env2, code.code, user.id, null);
      if (!ok) {
        await sendMessage(env2, chatId, "\u26A0\uFE0F \u0638\u0631\u0641\u06CC\u062A \u0627\u06CC\u0646 \u06A9\u062F \u062A\u0645\u0627\u0645 \u0634\u062F\u0647.");
        return;
      }
      const balance = await addBalance(env2, user.id, code.value, "gift", `\u06A9\u062F \u0647\u062F\u06CC\u0647 ${code.code}`);
      await clearState(env2, user.id);
      await sendMessage(
        env2,
        chatId,
        `\u{1F381} \u06A9\u062F \u0647\u062F\u06CC\u0647 \u062B\u0628\u062A \u0634\u062F!
\u0645\u0628\u0644\u063A: ${money(code.value)} \u062A\u0648\u0645\u0627\u0646
\u{1F45B} \u0645\u0648\u062C\u0648\u062F\u06CC \u062C\u062F\u06CC\u062F: <b>${money(balance)} \u062A\u0648\u0645\u0627\u0646</b>`,
        { reply_markup: mainKeyboard(isAdmin(env2, user.id)) }
      );
      return;
    }
    case "wait_receipt":
      await sendMessage(env2, chatId, "\u{1F4F8} \u0644\u0637\u0641\u0627\u064B <b>\u0639\u06A9\u0633 \u0631\u0633\u06CC\u062F</b> \u0631\u0648 \u0627\u0631\u0633\u0627\u0644 \u06A9\u0646 \u06CC\u0627 \xAB\u274C \u0627\u0646\u0635\u0631\u0627\u0641\xBB \u0631\u0648 \u0628\u0632\u0646.");
      return;
    default:
      break;
  }
  await sendMessage(env2, chatId, TEXTS.unknown, {
    reply_markup: mainKeyboard(isAdmin(env2, user.id))
  });
}
__name(handleMessage2, "handleMessage");
async function handleBack(env2, chatId, user, state) {
  switch (state.step) {
    case "buy_plan":
      await setState(env2, user.id, "buy_location", {});
      await sendMessage(env2, chatId, "\u{1F4CD} \u0644\u0648\u06A9\u06CC\u0634\u0646 \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:", {
        reply_markup: locationKeyboard()
      });
      return;
    case "buy_pay":
    case "buy_code": {
      const data = { ...state.data };
      delete data.plan_id;
      await setState(env2, user.id, "buy_plan", data);
      await sendMessage(env2, chatId, "\u{1F4E6} \u067E\u0644\u0646 \u0631\u0648 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646:", {
        reply_markup: planKeyboard2(data.pool)
      });
      return;
    }
    case "topup_amount":
    case "gift_code":
      await showAccount(env2, chatId, user);
      return;
    case "service_menu":
      await showServices(env2, chatId, user);
      return;
    default:
      await showMain(env2, chatId, user.id, TEXTS.mainMenu);
  }
}
__name(handleBack, "handleBack");

// src/index.js
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}
__name(json, "json");
async function handleUpdate(env2, update) {
  if (await isDuplicateUpdate(env2, update.update_id)) return;
  if (update.callback_query) {
    const query = update.callback_query;
    const caller = await touchUser(env2, query.from);
    if (caller.banned) return;
    if (String(query.data || "").startsWith("hlp:")) {
      await handleGuideCallback(env2, query);
      return;
    }
    await handleCallback(env2, query);
    return;
  }
  const message = update.message || update.edited_message;
  if (!message || !message.from || message.chat.type !== "private") return;
  const profile3 = await touchUser(env2, message.from);
  if (profile3.banned) {
    await sendMessage(env2, message.chat.id, TEXTS.banned, {
      reply_markup: { remove_keyboard: true }
    });
    return;
  }
  if (isAdmin(env2, profile3.id)) {
    const handled = await handleMessage(env2, message, profile3);
    if (handled) return;
  }
  await handleMessage2(env2, message, profile3);
}
__name(handleUpdate, "handleUpdate");
var index_default = {
  async fetch(request, env2, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/health") return json({ ok: true });
    if (url.pathname === "/init") {
      if (url.searchParams.get("key") !== env2.WEBHOOK_SECRET) return json({ ok: false }, 403);
      await ensureSchema(env2, true);
      const hookUrl = `${url.origin}/tg`;
      const res = await call(env2, "setWebhook", {
        url: hookUrl,
        secret_token: env2.WEBHOOK_SECRET,
        allowed_updates: ["message", "edited_message", "callback_query"],
        drop_pending_updates: true
      });
      return json({ ok: true, webhook: hookUrl, telegram: res });
    }
    if (url.pathname === "/tg" && request.method === "POST") {
      if (request.headers.get("x-telegram-bot-api-secret-token") !== env2.WEBHOOK_SECRET) {
        return new Response("forbidden", { status: 403 });
      }
      let update = null;
      try {
        update = await request.json();
      } catch (err) {
        return new Response("ok");
      }
      try {
        await ensureSchema(env2);
        await handleUpdate(env2, update);
      } catch (err) {
        console.log("HANDLER_ERROR", String(err && err.stack ? err.stack : err));
      }
      return new Response("ok");
    }
    return new Response("not found", { status: 404 });
  }
};
export {
  index_default as default,
  handleUpdate,
  mainKeyboard
};
//# sourceMappingURL=index.js.map
