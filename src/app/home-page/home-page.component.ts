import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";

import { GiphyServiceService } from '../giphy-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  gifs : any[];


  pageNum : number;



  callSearchAPI : Subject<any> = new Subject<any>();


  searchString : string;

  searchGif : any;

  constructor(private gifService : GiphyServiceService) {
    this.searchString = '';
    this.pageNum = 1;
    this.gifs = [];
   }

  ngOnInit(): void {
    this.callSearchAPI.pipe(debounceTime(1500)).subscribe((pageNum) => { 
      this.searchAPI(pageNum);
    })
    this.gifService.fetchGifs(1);
    this.gifService.getGifs().subscribe(data => { 
      if(data)
      {
        if(this.searchString.trim()!=='' && this.pageNum===1)
        {
          this.gifs = data;
        }
        else {
        this.gifs = [...this.gifs,...data];
        }
        console.log(this.gifs);
      }
        })
  }


  loadMore() { 
    this.pageNum= this.pageNum + 1;
    if(this.searchString.trim()==='')
    {
      this.gifService.fetchGifs(this.pageNum);
    }
    else { 
      this.searchAPI(this.pageNum);
    }
  }
  searchOperation()
  {
    this.pageNum=1;
    if(this.searchString.trim()==='')
    {
      this.gifService.fetchGifs(1);

    }
    else { 
      this.callSearchAPI.next(this.pageNum);
  }
  }

  searchAPI(pageNum : number) { 
    this.gifService.searchGif(this.searchString,pageNum);
  
  }




}
