import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusyIndicatorService } from '@acharyarajasekhar/busy-indicator';
import { take } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AddressFormControlService {

  constructor(
    private http: HttpClient,
    private actionSheetController: ActionSheetController,
    private busyInd: BusyIndicatorService) { }

  getDetailsByPINCode(pinCode: number) {
    return new Promise(res => {
      this.busyInd.show();
      let url = 'https://indian-pincodes.firebaseio.com/records.json?orderBy=%22pincode%22&equalTo=%22' + pinCode + '%22&print=pretty';
      this.http.get(url).pipe(take(1)).subscribe(async list => {

        let deliveryEnabledPOs = _.filter(list, { 'deliverystatus': 'Delivery' });

        let pos = [];
        _.forEach(deliveryEnabledPOs, po => {
          pos.push({
            ...po,
            country: "India",
            statecode: this.getStateID(po.statename),
            display: this.getPostalDetailsForPlainDisplay(po)
          })
        });

        let buttons = [];
        _.forEach(pos, office => {
          let button = {
            text: office.officename,
            handler: () => {
              res(office);
            }
          }
          buttons.push(button);
        });

        const actionSheet = await this.actionSheetController.create({
          header: 'Choose your post office',
          buttons: buttons
        });

        this.busyInd.hide();
        await actionSheet.present();
      })
    });
  }

  private getPostalDetailsForPlainDisplay(postal) {
    let details = '';
    if (postal) {
      if (postal.officename) {
        details = postal.officename.replace(' S.O', ', ').replace(' B.O', ', ').replace(' H.O', ', ');
        details += postal.taluk + ', ';
        if (!_.includes(postal.taluk, postal.districtname)) {
          details += postal.districtname + ', ';
        }
        details += postal.statename + ' - ' + postal.pincode + ", India";
      }
    } else {
      details = '';
    }
    return details;
  }

  private getStateID(stateName) {
    let s = _.filter(states, state => state.name.toUpperCase() === stateName.toUpperCase());
    if (s && s[0]) return s[0].code;
    return stateName;
  }

}

const states = [
  {
    "code": "AN",
    "name": "Andaman and Nicobar Islands"
  },
  {
    "code": "AP",
    "name": "Andhra Pradesh"
  },
  {
    "code": "AR",
    "name": "Arunachal Pradesh"
  },
  {
    "code": "AS",
    "name": "Assam"
  },
  {
    "code": "BR",
    "name": "Bihar"
  },
  {
    "code": "CG",
    "name": "Chandigarh"
  },
  {
    "code": "CH",
    "name": "Chhattisgarh"
  },
  {
    "code": "DH",
    "name": "Dadra and Nagar Haveli"
  },
  {
    "code": "DD",
    "name": "Daman and Diu"
  },
  {
    "code": "DL",
    "name": "Delhi"
  },
  {
    "code": "GA",
    "name": "Goa"
  },
  {
    "code": "GJ",
    "name": "Gujarat"
  },
  {
    "code": "HR",
    "name": "Haryana"
  },
  {
    "code": "HP",
    "name": "Himachal Pradesh"
  },
  {
    "code": "JK",
    "name": "Jammu and Kashmir"
  },
  {
    "code": "JH",
    "name": "Jharkhand"
  },
  {
    "code": "KA",
    "name": "Karnataka"
  },
  {
    "code": "KL",
    "name": "Kerala"
  },
  {
    "code": "LD",
    "name": "Lakshadweep"
  },
  {
    "code": "MP",
    "name": "Madhya Pradesh"
  },
  {
    "code": "MH",
    "name": "Maharashtra"
  },
  {
    "code": "MN",
    "name": "Manipur"
  },
  {
    "code": "ML",
    "name": "Meghalaya"
  },
  {
    "code": "MZ",
    "name": "Mizoram"
  },
  {
    "code": "NL",
    "name": "Nagaland"
  },
  {
    "code": "OR",
    "name": "Odisha"
  },
  {
    "code": "PY",
    "name": "Puducherry"
  },
  {
    "code": "PB",
    "name": "Punjab"
  },
  {
    "code": "RJ",
    "name": "Rajasthan"
  },
  {
    "code": "SK",
    "name": "Sikkim"
  },
  {
    "code": "TN",
    "name": "Tamil Nadu"
  },
  {
    "code": "TS",
    "name": "Telangana"
  },
  {
    "code": "TR",
    "name": "Tripura"
  },
  {
    "code": "UK",
    "name": "Uttarakhand"
  },
  {
    "code": "UP",
    "name": "Uttar Pradesh"
  },
  {
    "code": "WB",
    "name": "West Bengal"
  }
];
