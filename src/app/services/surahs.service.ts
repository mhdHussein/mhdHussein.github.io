import { Injectable } from '@angular/core';
import {AngularFire, AngularFireDatabase, FirebaseListObservable} from "angularfire2";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {switchMap} from "rxjs/operator/switchMap";
import {Surah} from "../model/surah";
import {Contemplation} from "../model/contemplation";
@Injectable()
export class SurahsService {



  constructor(private ngFire: AngularFireDatabase) {}


  loadFirstPage(pageSize:number): FirebaseListObservable<Surah[]>{

    return this.ngFire.list('surahs' , {
      query:{
        limitToFirst : pageSize
      }
    });
  }

  loadNextPage(key:string , pageSize:number):Observable<[Surah]>{

    return this.ngFire.list('surahs' , {
      query:{
        orderByKey: true,
        startAt: key,
        limitToFirst : pageSize + 1
      }
    }).map(surahs => surahs.slice(1 , surahs.length));

  }

  loadPreviousPage(key:string , pageSize:number):Observable<[Surah]>{

    return this.ngFire.list('surahs' , {
      query:{
        orderByKey: true,
        endAt: key,
        limitToLast : pageSize + 1
      }
    }).map(surahs => surahs.slice(0 , surahs.length -1 ));

  }



  //
  // pushNumNum(surah:Surah){
  //
  //
  //
  //   return this.ngFire.list('contemplations').map(contemplationList => {
  //     contemplationList.map(con => {
  //
  //       if(con.$key >= 2661){
  //         this.ngFire.object('contemplations/' + con.$key ).update({
  //           surah_ayah_numbers : con.surah_number + "_" + con.ayah_number
  //         });
  //       }
  //
  //
  //     });
  //
  //   });
  // }

}
