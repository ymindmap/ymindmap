import type { State } from "@ymindmap/state";
import { View } from "@ymindmap/view";

export type Command = (state: State, view?: View) => boolean;
export type Commands = Record<string, Command>

export type chainCommands = (...commands: readonly Command[]) => Command;

export type CommandSpec = (...args: any[]) => Command
export type RawCommands = Record<string, CommandSpec>;