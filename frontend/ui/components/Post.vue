<template>
  <div id="container">
    <div class="post-container" @click.self='goCommentListPage'>
      <h3 class="post-title">{{ data.posts[index].title }}</h3>
      <p class="post-artist">
        アーティスト名:&nbsp; &nbsp;{{ data.posts[index].artist }}
      </p>
      <p class="post-category">
        カテゴリー:&nbsp; &nbsp; {{ data.posts[index].category }}
      </p>
      <p class="post-comment-label">コメント:</p>
      <p class="post-body">{{ data.posts[index].body }}</p>
      <div class="icon">
        <div class="like-icon">
          <span>いいね</span>
          <span v-if="likes.isLike">
            <Like @offLike="offLike" />
          </span>
          <span v-if="!likes.isLike">
            <UnLike @onLike="onLike" />
          </span>
          {{likes.counter}}
        </div>
        <div class="comment-icon">
          <span>コメント</span>
          <CommentIcon @goCommentPage="goCommentPage" />
          {{comments.counter}}
        </div>
      </div>
      <div class="button" v-if="myPost">
        <button @click="goEditPage" class="btn1 btn">編集</button>
        <button @click="deletePost" class="btn2 btn">削除</button>
      </div>
      <div class="contributor">
        <p>投稿者:&nbsp; &nbsp;{{ contributor }}</p>
      </div>
    </div>
  </div>
</template>

<script scoped>
import Like from './Like';
import UnLike from './UnLike';
import CommentIcon from './CommentIcon';
export default {
  name: 'Post',
  component: { Like, UnLike, CommentIcon },
  data() {
    return {
      likes: {
        counter: 0,
        isLike: false  
      },
      comments: { counter: 0 },
      myPost: false 
    }
  },
  props: {
    data: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  created() {
    const postId = this.data.posts[this.index].post_id;
    const postuserId = this.data.posts[this.index].user_id;
    const userId = this.$store.state.users.userData.userId;
    this.data.postLikes.forEach(postLike => {
      if(userId === postLike.user_id && postId === postLike.post_id) {
        this.switchLike();
      }
      if(postLike.post_id === postId) {
        this.increaseLikeCounter();
      }
    });
    if(postuserId === userId) {
      this.myPost = !this.myPost;
    }
    this.data.comments.forEach(comment => {
      if(comment.post_id === postId) {
        this.comments.counter++
      }
    })
  },
  methods: {
    async onLike() {
      const config = {
        headers: {
          authorization: `Bearer ${this.$store.state.users.userData.token}`
        }
      }
      const res = await this.$axios.$post(`api/post/likes/${this.$store.state.users.userData.userId}/${this.data.posts[this.index].post_id}`, null, config);
      const data = await JSON.parse(res);
      if(!data.result) {
        this.$store.commit('errors/setError', data.error);
        return;
      }
      this.increaseLikeCounter();
      this.switchLike();
    },
    async offLike() {
      const config = {
        headers: {
          authorization: `Bearer ${this.$store.state.users.userData.token}`
        }
      }
      const res = await this.$axios.$delete(`api/post/likes/delete/${this.$store.state.users.userData.userId}/${this.data.posts[this.index].post_id}`, config);
      const data = await JSON.parse(res);
      if(!data.result){
        this.$store.commit('errors/setError', data.error);
        return;
      }
      this.decreaseLikeCounter();
      this.switchLike();
    },
    switchLike() {
      this.likes.isLike = !this.likes.isLike;
    },
    increaseLikeCounter() {
      this.likes.counter++;
    },
    decreaseLikeCounter() {
      this.likes.counter--;
    },
    goEditPage() {
      this.$router.push(`/posts/${this.data.posts[this.index].post_id}`);
    },
    goCommentPage() {
      this.$router.push(`/comments/post/${this.data.posts[this.index].post_id}`);
    },
    goCommentListPage() {
      this.$router.push(`/comments/${this.data.posts[this.index].post_id}`);
    },
    async deletePost() {
      const token = this.$store.state.users.userData.token;
      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };
      const postId = this.data.posts[this.index].post_id;
      const res = await this.$axios.$delete(`api/posts/delete/${postId}`,config);
      const result = JSON.parse(res);
      if(!result.result) {
        this.$store.commit('errors/setError', result.error);
        return;
      }; 
      this.$emit('deletePost', this.index);
    }
  },
  computed: {
    contributor() {
      let name;
      this.data.users.forEach(user => {
        if (user.user_id === this.data.posts[this.index].user_id) {
          name = user.name;
        }
      });
      return name;
    },
  },
};
</script>

<style>
.btn2 {
  display: inline;
  height: 40px;
  width: 100px;
  line-height: 20px;
  background: #ce5c65;
  color: #575757;
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  margin-left: 20px;
}
.btn1 {
  display: inline;
  height: 40px;
  width: 100px;
  line-height: 20px;
  background: #aaefe7;
  color: #474747;
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  margin-right: 20px;
}
.post-container {
  width: 85%;
  height: 400px;
  border: 1px solid;
  padding: 20px;
  margin: 40px auto;
  border-radius: 50px/50px;
  text-align: center;
}
.post-title {
  width: 30%;
  margin: 0 auto;
  margin-bottom: 10px;
}
.post-artist {
  width: 50%;
  text-align: right;
  margin: 0 auto;
  margin-left: 50%;
  margin-bottom: 10px;
}
.post-category {
  width: 30%;
  text-align: right;
  margin: 0 ;
  margin-left: 70%;
  margin-bottom: 10px;
}
.post-comment-label {
  width: 15%;
  text-align: left;
  margin-left: 150px;
  margin-bottom: 0;
}
.post-body {
  width: 70%;
  height: 100px;
  margin: 0 auto;
  word-wrap: normal;
}
.button {
  width: 40%;
  margin: 0 auto;
}
.contributor {
  width: 50%;
  text-align: right;
  margin: 0 auto;
  margin-top: 20px;
  margin-left: 40%;
}
.icon {
  text-align: left;
  display: inline-block;
  margin-right: 500px;
  margin-top: 10px;
  width: 300px;
  height: 30px;
}
.like-icon {
  display: inline;
}
.comment-icon {
  display: inline;
}
</style>