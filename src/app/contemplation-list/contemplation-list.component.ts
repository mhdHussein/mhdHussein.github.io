import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Contemplation} from "../model/contemplation";
import {ContemplationService} from "../services/contemplation.service";

@Component({
  selector: 'contemplation-list',
  templateUrl: './contemplation-list.component.html',
  styleUrls: ['./contemplation-list.component.css']
})
export class ContemplationListComponent implements OnInit {

  private numberOfLoadedContemplations:number = 0;
  private pageSize:number = 12;
  private loaded: boolean = false;
  private selectedSurahNumber: number;
  private contemplations: Contemplation[];
  private file:File;

  constructor(private route:ActivatedRoute, private conSvc:ContemplationService) { }

  ngOnInit() {

    this.getContemplationsFirstPage(this.pageSize);

  }

  getContemplationsFirstPage(pageSize:number){

    this.selectedSurahNumber = this.route.snapshot.params['id'];
    this.conSvc.getContemplationsFirstPage(this.selectedSurahNumber+"" , pageSize)
      .subscribe(con => {


        con.map(c =>{

          this.conSvc.getAyahText(this.selectedSurahNumber+"" , c.ayah_number)
            .subscribe(ayahArray => {
              ayahArray.map(ayah => {

                c['ayahText'] = ayah.text;
                this.loaded = true;
              });

            });
        });
        this.numberOfLoadedContemplations = this.pageSize;
        this.contemplations = con;

      });

  }
  next(){
    this.loaded = false;
    const lastContemplationKey = this.contemplations[this.contemplations.length -1 ].$key;
    this.conSvc.loadNextPage(lastContemplationKey+"", this.pageSize)
      .subscribe(con => {
        con.map(c =>{

          this.conSvc.getAyahText(this.selectedSurahNumber+"" , c.ayah_number)
            .subscribe(ayahArray => {
              ayahArray.map(ayah => {

                c['ayahText'] = ayah.text;
                this.loaded = true;
              });

            });
        });
        this.contemplations = con;
        this.loaded = true;
        this.numberOfLoadedContemplations += this.pageSize;

      });

  }

  previous(){
    this.loaded = false;
    const firstContemplationKey = this.contemplations[0].$key;
    this.conSvc.loadPreviousPage(firstContemplationKey+"", this.pageSize)
      .subscribe(con => {
        con.map(c =>{

          this.conSvc.getAyahText(this.selectedSurahNumber+"" , c.ayah_number)
            .subscribe(ayahArray => {
              ayahArray.map(ayah => {

                c['ayahText'] = ayah.text;
                this.loaded = true;
              });

            });
        });
        this.contemplations = con;
        this.loaded = true;
        this.numberOfLoadedContemplations -= this.pageSize;

      });
  }


  isFirstPage(){
    if(this.loaded == false)
      return true;
    return this.numberOfLoadedContemplations <= this.pageSize;

  }



  isLastPage(){
    if(this.loaded == false)
      return true;

    if(this.contemplations.length != this.pageSize)
      return false;

    return this.contemplations[0]['surah_number']+"" != this.selectedSurahNumber+"";
  }

  uploadFile(conKey){

    this.conSvc.uploadAudioFile(conKey , this.file);
    console.log(conKey);

  }

  onChange(event) {
    this.file =  event.srcElement.files[0];
    console.log(this.file);
  }

  deleteAudioFile(conKey:string,fileName:string){
      this.conSvc.deleteAudioFile(conKey , fileName);
  }

}
