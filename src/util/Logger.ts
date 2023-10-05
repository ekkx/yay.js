import colors from 'colors';
import winston from 'winston';

/**
 * ログ用のクラス
 */
export class YJSLogger {
	private logger: winston.Logger;
	private debugMode: boolean;
	private disableLog: boolean;

	public constructor(debugMode: boolean = false, disableLog: boolean = false) {
		this.debugMode = debugMode;
		this.disableLog = disableLog;

		this.logger = winston.createLogger({
			transports: [new winston.transports.Console()],
			format: winston.format.printf((log) => {
				const date = new Date();
				const color = this.getColor(log.level);
				const time = [date.getHours(), date.getMinutes(), date.getSeconds()]
					.map((t) => (t >= 10 ? t : '0' + t))
					.join(':');
				process.stdout.clearLine(0); // ログが重なるのを防ぐため
				return `${colors.magenta(time)} ${color(`[${log.level.toUpperCase()}]`)} » ${log.message}`;
			}),
			level: this.debugMode ? 'debug' : 'info',
		});
	}

	private getColor(level: string): any {
		switch (level) {
			case 'info':
				return colors.green;
			case 'warn':
				return colors.yellow;
			case 'error':
				return colors.red;
			case 'debug':
				return colors.blue;
			default:
				return colors.reset;
		}
	}

	private log(level: string, message: string): void {
		if (!this.disableLog) {
			this.logger.log(level, message);
		}
	}

	public info(message: string): void {
		this.log('info', message);
	}

	public warn(message: string): void {
		this.log('warn', message);
	}

	public error(message: string): void {
		this.log('error', message);
	}

	public debug(message: string): void {
		this.log('debug', message);
	}

	public setDebugMode(debugMode: boolean): void {
		this.debugMode = debugMode;
		this.logger.level = debugMode ? 'debug' : 'info';
	}

	public setDisableLog(disableLog: boolean): void {
		this.disableLog = disableLog;
	}
}

const logger = new YJSLogger(false, false);

logger.info('hello');
logger.info('hello');
logger.info('hello');
logger.info('hello');
