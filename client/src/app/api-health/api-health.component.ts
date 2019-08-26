import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { Stats } from '../model/stats.model';
import { ApiHealthService } from '../core/apiHealth.service';
import { _ } from 'underscore';

@Component({
  selector: 'app-api-health',
  templateUrl: './api-health.component.html',
  styleUrls: ['./api-health.component.css']
})
export class ApiHealthComponent implements OnInit {
  stats: Stats;
  isObject (val) {return typeof val === 'object'; };
  arrayNumberToFixed (vals) {return _.map(vals, val => val.toFixed(4))};
  convertObjectTemplate (data) {
    let template = '';
    _.each(data, (key, value) => {
        template += '<p>' + key + ':' + value + '</p>'
    })
    return template;
  };
  constructor(private apiHealthService: ApiHealthService) {
      this.stats = {

      };
  }

  ngOnInit() {
      this.apiHealthService.getStats()
          .subscribe({
              next: data => {
                 this.stats = data;
              },
              error: err => {
                  alert(err.error.message);
              }
          });
  }
  apiHealthRefresh () {
      this.apiHealthService.getStats()
          .subscribe({
              next: data => {
                  this.stats = data;
              },
              error: err => {
                  alert(err.error.message);
              }
          });
  }

}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(value, args:string[]) : any {
        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}