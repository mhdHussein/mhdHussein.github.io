export class Surah {

  constructor(
    public $key:string,
    public number: number,
    public name : string,
    public ayahCount: number,
    public first:boolean,
    public last:boolean
  ){}
}
