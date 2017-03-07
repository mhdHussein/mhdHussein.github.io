import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ayahNumber'
})
export class AyahNumberPipe implements PipeTransform {

  transform(ayahNumber: number, args?: any): any {

    if(ayahNumber == 1){
      return "آية";
    }else if(ayahNumber == 2){
      return"آيتان";
    }else if(ayahNumber > 2 && ayahNumber < 11){
      return ayahNumber + " آيات";
    }else{
      return ayahNumber + " آية";
    }
  }

}
