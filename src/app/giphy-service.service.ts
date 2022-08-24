import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiphyServiceService {


  gifs : Subject<any> = new Subject<any>();
  constructor(private http : HttpClient) {
   }





   fetchGifs(pageNum : number) { 
    let offset = pageNum*10
    return this.http.get('https://api.giphy.com/v1/gifs/trending?api_key=fyghewwpsRcFi5XP7xHWxwT5iTy9ja5n&limit=10&offset=' + offset).subscribe((response : any) => {
      this.gifs.next(response.data);
    });
   }

   searchGif(searchString : string, pageNum : number) 
   {
    let offset = pageNum*10
    return this.http.get("https://api.giphy.com/v1/gifs/search?api_key=fyghewwpsRcFi5XP7xHWxwT5iTy9ja5n&q=" + searchString + "&limit=10&offset=" +offset).subscribe((response : any) => { 
      this.gifs.next(response.data)
    })
   }

   getGifs() { 
    return this.gifs.asObservable();
   }
}
