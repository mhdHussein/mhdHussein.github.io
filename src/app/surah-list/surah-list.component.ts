import {Component, OnInit} from "@angular/core";
import {SurahsService} from "../services/surahs.service";
import {Surah} from "../model/surah";
import {Contemplation} from "../model/contemplation";

@Component({
  selector: 'surah-list',
  templateUrl: './surah-list.component.html',
  styleUrls: ['./surah-list.component.css']
})
export class SurahListComponent implements OnInit {

  private surahs: Surah[];
  private loaded: boolean = false;
  private totalNumberOfSurahs:number = 114;
  private numberOfLoadedSurahs:number = 0;

  private surahsPerPage = 12;

  private contemplations:Contemplation[];


  constructor(private surahSvc: SurahsService) { }

  ngOnInit() {
    this.loadFirstPage();
  }

  loadFirstPage(pageSize:number = this.surahsPerPage){

      this.surahSvc.loadFirstPage(pageSize)
        .subscribe(surahs =>{
          this.surahs = surahs;
          this.loaded = true;
          this.numberOfLoadedSurahs = this.surahsPerPage;

        });

  }

  next(){
    this.loaded = false;
    const lastSurahKey = this.surahs[this.surahs.length -1 ].$key;
    this.surahSvc.loadNextPage(lastSurahKey, this.surahsPerPage)
      .subscribe(surahs => {
        this.surahs = surahs;
        this.loaded = true;
        this.numberOfLoadedSurahs += this.surahsPerPage;

      });


  }

  previous(){
    this.loaded = false;
    const fistSurahKey = this.surahs[0].$key;
    this.surahSvc.loadPreviousPage(fistSurahKey, this.surahsPerPage)
      .subscribe(surahs => {
        this.surahs = surahs;
        this.loaded = true;
        this.numberOfLoadedSurahs -= this.surahsPerPage;

      });
  }

  isFirstPage(){
    if(this.loaded == false)
      return true;
    return this.numberOfLoadedSurahs <= this.surahsPerPage;

  }

  isLastPage(){
    if(this.loaded == false)
      return true;
    return this.numberOfLoadedSurahs >= this.totalNumberOfSurahs;
  }

  // selectSurah(surah:Surah){
  //
  //   this.surahSvc.getContemplationsFirstPage(surah)
  //   .subscribe(con => {
  //     this.contemplations = con;
  //     console.log(this.contemplations);
  //   });
  //
  // }


}
