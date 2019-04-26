import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NotificationManagerService extends Service {

	@tracked notification = null;

	notify(text, time = 3000) {
		this.notification = text;
		setTimeout(() => {
			this.notification = null;
		}, time)
	}
}
