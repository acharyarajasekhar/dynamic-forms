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

  constructor() { }

  ngOnInit() {
  }

  cardHeaderStyleObject(): Object {
    if (!!this.coverPhotoUrl) {
      return { "background-image": `url(${this.coverPhotoUrl})` }
    }
    else {
      let stl: any = { "background-image": 'none' }
      if (!!this.coverBgColor) {
        stl = {          
          "background-color": this.coverBgColor
        }
      }
      return stl;
    }
  }

}
