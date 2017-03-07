import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2";
import {Observable} from "rxjs";
import {Contemplation} from "../model/contemplation";
import {Ayah} from "../model/ayah";
import * as firebase from "firebase";

@Injectable()
export class ContemplationService {

  private AUDIO_FOLDER: string = 'audio';
  private storageRef = firebase.storage().ref();

  constructor(private ngFire:AngularFireDatabase) { }

  getContemplationsFirstPage(surahNumber:string , pageSize:number):Observable<Contemplation[]>{

    return this.ngFire.list('contemplations', {
      query : {
        orderByChild: 'surah_number',
        equalTo : +surahNumber,
        limitToFirst : pageSize
      }
    }).map(Contemplation.fromJsonArray);
  }

  getAyahText(surahNumber , ayahNumber):Observable<Ayah[]>{

    if(ayahNumber == 0)
      ayahNumber = 1;

    return this.ngFire.list('ayahs'
      ,{
        query : {
          orderByChild : 'surah_ayah_numbers',
          equalTo : surahNumber + '_' + ayahNumber,
          limitToFirst: 1
        }
      }).map(Ayah.fromJsonArray);
  }

  loadNextPage(key:string , pageSize:number):Observable<[Contemplation]>{

    return this.ngFire.list('contemplations' , {
      query:{
        orderByKey: true,
        startAt: key,
        limitToFirst : pageSize + 1
      }
    }).map(con => con.slice(1 , con.length));

  }

  loadPreviousPage(key:string , pageSize:number):Observable<[Contemplation]>{

    return this.ngFire.list('contemplations' , {
      query:{
        orderByKey: true,
        endAt: key,
        limitToLast : pageSize + 1
      }
    }).map(con => con.slice(0 , con.length -1 ));

  }

  uploadAudioFile(conKey:any , file: File){



    file["isUploading"] = true;

    file["progress"] = 2;
    let uploadTask: firebase.storage.UploadTask = this.storageRef.child(`${this.AUDIO_FOLDER}/${file.name}`).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => file["progress"] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      (error) => {},
      () => {

        file["isUploading"] = false;
        this.saveUrl(conKey , uploadTask.snapshot.downloadURL , file.name);
      }
    );


  }

  saveUrl(conKey ,  url:string , audioFileName:string){

    this.ngFire.object('contemplations/' + conKey).update({url : url , audioFileName : audioFileName});
  }

  deleteAudioFile(conKey:string, fileName:string){
    this.storageRef.child(`${this.AUDIO_FOLDER}/${fileName}`)
      .delete()
      .then(() =>{
        this.ngFire.object('contemplations/' + conKey + '/url').remove();
        this.ngFire.object('contemplations/' + conKey + '/audioFileName').remove();
      })
  }

}
