export class Ayah {

  constructor(
    public $key:string,
    public Ayah_number:number,
    public surah_number:number,
    public surah_name: string,
    public surah_ayah_numbers:string,
    public text:string
  ){}


  static fromJson({$key,Ayah_number,surah_number,surah_name,surah_ayah_numbers,text}):Ayah{
    return new Ayah($key,Ayah_number,surah_number,surah_name,surah_ayah_numbers,text);
  }

  static fromJsonArray(json: any[]):Ayah[]{
    return json.map(Ayah.fromJson);
  }
}
