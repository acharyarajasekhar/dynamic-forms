import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

const weekdays = moment.weekdaysShort();

export function templeTimingsValidator(control: AbstractControl): { [key: string]: boolean } | null {

    if (!!control.value) {

        let allIsOk = true;

        for (let w of weekdays) {
            if (!(!!control.value[w]['Morning']['Open'] && !!control.value[w]['Morning']['Close'] && !!control.value[w]['Evening']['Open'] && !!control.value[w]['Evening']['Close'])) {
                allIsOk = false;
                break;
            }
        }

        if (allIsOk) {

            for (let w of weekdays) {
                let mOpen = moment(control.value[w]['Morning']['Open'], 'HH:mm').toDate();
                let mClose = moment(control.value[w]['Morning']['Close'], 'HH:mm').toDate();
                let eOpen = moment(control.value[w]['Evening']['Open'], 'HH:mm').toDate();
                let eClose = moment(control.value[w]['Evening']['Close'], 'HH:mm').toDate();

                if (!((mOpen < mClose) && (mClose < eOpen) && (eOpen < eClose))) {

                    allIsOk = false;
                    break;
                }
            }

            if (allIsOk) {
                return (null);
            }
            return ({ 'impropertempletimings': true });

        }
        return ({ 'templetimings': true });
    }

    return (null);

}