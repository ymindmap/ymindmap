import type { State } from "@ymindmap/state";
import { BoardView } from "@ymindmap/view";

export type Command = (state: State, view: BoardView) => boolean;
export type Commands = Record<string, Command>

export type chainCommands = (...commands: readonly Command[]) => Command;

export type CommandSpec = (...args: any[]) => Command
export type RawCommands = Record<string, CommandSpec>;