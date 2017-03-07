export class Contemplation {

  constructor(
    public $key:number,
    public surah_number:number,
    public ayah_number:number,
    public surah_name:string,
    public source:string,
    public text:string,
    public favorit:number,
    public url:string,
    public audioFileName:string
  ){}

  static fromJson({$key,surah_number,ayah_number,surah_name,source,text,favorit,url,audioFileName}):Contemplation{
      return new Contemplation($key,surah_number,ayah_number,surah_name,source,text,favorit,url,audioFileName);
  }

  static fromJsonArray(json: any[]):Contemplation[]{
      return json.map(Contemplation.fromJson);
  }
}
