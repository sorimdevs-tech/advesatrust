// Type declarations for Deno runtime in Supabase Edge Functions
// This enables VS Code IntelliSense for the `Deno` global without the Deno extension.

declare namespace Deno {
  export interface Env {
    get(key: string): string | undefined;
    set(key: string, value: string): void;
    delete(key: string): void;
    toObject(): Record<string, string>;
  }

  export const env: Env;

  export interface ServeHandlerInfo {
    remoteAddr: { hostname: string; port: number; transport: "tcp" | "udp" };
  }

  export type ServeHandler = (
    request: Request,
    info?: ServeHandlerInfo
  ) => Response | Promise<Response>;

  export interface ServeOptions {
    port?: number;
    hostname?: string;
    onListen?: (params: { hostname: string; port: number }) => void;
    onError?: (error: unknown) => Response | Promise<Response>;
    signal?: AbortSignal;
  }

  export function serve(
    handler: ServeHandler,
    options?: ServeOptions
  ): void;

  export function serve(
    options: ServeOptions & { handler: ServeHandler }
  ): void;

  export interface NetAddr {
    transport: "tcp" | "udp";
    hostname: string;
    port: number;
  }

  export interface UnixAddr {
    transport: "unix" | "unixpacket";
    path: string;
  }

  export type Addr = NetAddr | UnixAddr;

  export function connect(options: ConnectOptions): Promise<Conn>;
  export function listen(options: ListenOptions): Listener;

  export interface Conn {
    readable: ReadableStream<Uint8Array>;
    writable: WritableStream<Uint8Array>;
    close(): void;
    readonly rid: number;
    readonly localAddr: Addr;
    readonly remoteAddr: Addr;
  }

  export interface Listener extends AsyncIterable<Conn> {
    accept(): Promise<Conn>;
    close(): void;
    readonly rid: number;
    readonly addr: Addr;
    [Symbol.asyncIterator](): AsyncIterableIterator<Conn>;
  }

  export interface ConnectOptions {
    port: number;
    hostname?: string;
    transport?: "tcp" | "udp";
  }

  export interface ListenOptions {
    port: number;
    hostname?: string;
    transport?: "tcp" | "udp";
  }

  export function readTextFile(path: string): Promise<string>;
  export function readTextFileSync(path: string): string;
  export function readFile(path: string): Promise<Uint8Array>;
  export function readFileSync(path: string): Uint8Array;
  export function writeTextFile(path: string, data: string): Promise<void>;
  export function writeTextFileSync(path: string, data: string): void;
  export function writeFile(path: string, data: Uint8Array): Promise<void>;
  export function writeFileSync(path: string, data: Uint8Array): void;
  export function remove(path: string, options?: { recursive?: boolean }): Promise<void>;
  export function removeSync(path: string, options?: { recursive?: boolean }): void;
  export function mkdir(path: string, options?: { recursive?: boolean }): Promise<void>;
  export function mkdirSync(path: string, options?: { recursive?: boolean }): void;
  export function chdir(directory: string): void;
  export function cwd(): string;
  export function chmod(path: string, mode: number): Promise<void>;
  export function chmodSync(path: string, mode: number): void;
  export function chown(path: string, uid: number, gid: number): Promise<void>;
  export function chownSync(path: string, uid: number, gid: number): void;
  export function copyFile(fromPath: string, toPath: string): Promise<void>;
  export function copyFileSync(fromPath: string, toPath: string): void;
  export function rename(oldPath: string, newPath: string): Promise<void>;
  export function renameSync(oldPath: string, newPath: string): void;
  export function stat(path: string): Promise<FileInfo>;
  export function statSync(path: string): FileInfo;
  export function lstat(path: string): Promise<FileInfo>;
  export function lstatSync(path: string): FileInfo;
  export function realPathSync(path: string): string;
  export function realPath(path: string): Promise<string>;
  export function readDir(path: string): AsyncIterable<DirEntry>;
  export function readDirSync(path: string): Iterable<DirEntry>;
  export function exists(path: string): Promise<boolean>;
  export function existsSync(path: string): boolean;

  export interface FileInfo {
    isFile: boolean;
    isDirectory: boolean;
    isSymlink: boolean;
    size: number;
    mtime: Date | null;
    atime: Date | null;
    birthtime: Date | null;
    dev: number;
    ino: number;
    mode: number | null;
    nlink: number | null;
    uid: number | null;
    gid: number | null;
    rdev: number | null;
    blksize: number | null;
    blocks: number | null;
    isBlockDevice: boolean | null;
    isCharDevice: boolean | null;
    isFifo: boolean | null;
    isSocket: boolean | null;
  }

  export interface DirEntry {
    name: string;
    isFile: boolean;
    isDirectory: boolean;
    isSymlink: boolean;
  }

  export const args: string[];
  export const pid: number;
  export const build: { arch: string; os: "windows" | "darwin" | "linux" };
  export const version: { deno: string; v8: string; typescript: string };
  export const noColor: boolean;
  export const mainModule: string;
  export const exitCode: number;
  export function exit(code?: number): never;
  export function inspect(value: unknown, options?: { depth?: number; colors?: boolean; compact?: boolean }): string;
  export function format(...args: unknown[]): string;
  export function kill(pid: number, signal?: string): void;
  export function run(options: RunOptions): Process;
  export function sh(command: string | string[], options?: RunOptions): Promise<{ code: number; stdout: string; stderr: string }>;
  export function sleep(ms: number): Promise<void>;

  export interface RunOptions {
    cmd: string[];
    cwd?: string;
    env?: Record<string, string>;
    stdout?: "inherit" | "piped" | "null";
    stderr?: "inherit" | "piped" | "null";
    stdin?: "inherit" | "piped" | "null";
  }

  export interface Process {
    readonly rid: number;
    readonly pid: number;
    status(): Promise<ProcessStatus>;
    output(): Promise<Uint8Array>;
    stderrOutput(): Promise<Uint8Array>;
    close(): void;
    kill(signo: number): void;
  }

  export interface ProcessStatus {
    success: boolean;
    code: number;
    signal?: string;
  }

  export function fetch(input: Request | URL | string, init?: RequestInit): Promise<Response>;
}