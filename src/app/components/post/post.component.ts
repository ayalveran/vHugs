import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PostService} from '../../services/post.service';
import {postResponse} from '../../Models/postResponse';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

posts:postResponse[] = [];
postBody:any;
keywordsArr =[];


  constructor(public postService: PostService,private router:Router) { }

  ngOnInit(): void {
    
    this.getAllPosts();

    console.log(this.postService.keyWordFound);
  }

  goToSinglePost(id){
  
    this.postService.setId(id);
    this.router.navigate(['singlepost']);
  }
  addPost(){
    this.router.navigate(['addpost']);
  }

  addHug(id){
    this.postService.addHug(id).subscribe(data=>{
      this.getAllPosts();
    })
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe(
      (posts:postResponse[]) => {
      
        this.posts = posts;
        this.posts.reverse();
        this.posts.forEach(post=>{
          
          this.postBody = post.body.split(/\s+/);
          
         
          
  
          this.postBody.forEach(word=>{
            
            const newWord = word.replace(/[^0-9a-z]/gi, '');
            
            this.postService.keywords.forEach(keyword=>{
                if(newWord.toUpperCase() == keyword.word.toUpperCase()){
                  this.keywordsArr.push(keyword);
                }
            })

            // if(word == this.postService.keywords.word){
            //     console.log('keyword found')
                
            // }
            
          })
          console.log(this.postBody);
        })

    
      
        // console.log(this.posts);
     
      })

    
  }

}
