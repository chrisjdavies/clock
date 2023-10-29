import * as vscode from 'vscode';

const DEFAULT_24_HOUR = true;
const DEFAULT_UPDATE_PERIOD = 1000;

let statusItem: undefined | vscode.StatusBarItem;
let show24Hour: boolean = DEFAULT_24_HOUR;

function tick() {
	if (statusItem) {
		const config = vscode.workspace.getConfiguration('clock');
		const cfg24Hour = config.get<boolean>('format24Hour');
		if (cfg24Hour === undefined) {
			show24Hour = DEFAULT_24_HOUR;
		} else {
			show24Hour = cfg24Hour;
		}

		statusItem.text = new Date().toLocaleTimeString(vscode.env.language, { hour12: !show24Hour, timeStyle: 'short' });
		statusItem.tooltip = new Date().toLocaleDateString(vscode.env.language, { dateStyle: 'full' });

		setTimeout(tick, DEFAULT_UPDATE_PERIOD);
	}
}

export function activate(context: vscode.ExtensionContext) {
	statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -1337);
	tick();

	statusItem.show();
}

export function deactivate() {
	if (statusItem) {
		statusItem.hide();
		statusItem.dispose();
		statusItem = undefined;
	}
}
