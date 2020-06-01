import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'profile-card',
  templateUrl: 'profile-card.component.html',
  styleUrls: ['profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input() title: string = 'Profile Title';
  @Input() subTitles: Array<string> = ['sub title #1', 'sub title #2', 'sub title #3'];
  @Input() avatarUrl: string = 'https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?ixlib=rb-1.2.1&w=1000&q=80';
  @Input() coverPhotoUrl: string = 'https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?ixlib=rb-1.2.1&w=1000&q=80';
  @Input() coverBgColor: string = "gray";
  @Input() displayFlat: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  cardHeaderStyleObject(): Object {

    let stl: any = {
      "background-image": 'none',
      "background-color": !!this.coverBgColor ? this.coverBgColor : "#fff"
    }

    if (!!this.coverPhotoUrl) {
      stl = {
        ...stl,
        "background-image": `url(${this.coverPhotoUrl})`
      }
    }

    return stl;

  }

  cardBorderStyleObject(): Object {
    if (!!this.displayFlat) {
      return { "border-width": '0px', "border-radius": "0px", "margin": "0px" }
    }
    return {};
  }

}
