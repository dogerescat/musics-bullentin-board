<template>
  <div id="container">
    <div class="post-container">
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
          <span>コメント</span><Comment />
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

<script>
import Like from './Like';
import UnLike from './UnLike';
import Comment from './Comment';
export default {
  name: 'Post',
  component: { Like, UnLike, Comment },
  data() {
    return {
      likes: {
        counter: 0,
        isLike: false  
      },
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
    const userId = this.$store.state.users.user_data.user_id;
    this.data.postLikes.forEach(postLike => {
      if(userId === postLike.user_id || postId === postLike.post_id) {
        this.switchLike();
      }
      if(postLike.post_id === postId) {
        this.increaseLikeCounter();
      }
    });
    if(postuserId === userId) {
      this.myPost = !this.myPost;
    }
  },
  methods: {
    async onLike() {
      const res = await this.$axios.$post(`api/post/likes/${this.$store.state.users.user_data.user_id}/${this.data.posts[this.index].post_id}`);
      const result = await JSON.parse(res);
      if(!result.result) {
        return;
      }
      this.increaseLikeCounter();
      this.switchLike();
    },
    async offLike() {
      const res = await this.$axios.$delete(`api/post/likes/delete/${this.$store.state.users.user_data.user_id}/${this.data.posts[this.index].post_id}`);
      const result = await JSON.parse(res);
      if(!result.result){
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
    async deletePost() {
      try {
        let token = localStorage.getItem('token');
        token = JSON.parse(token);
        const config = {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
        const postId = this.data.posts[this.index].post_id;
        const res = await this.$axios.$delete(`api/posts/delete/${postId}`,config);
      } catch(error) {
        return;
      }
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
  width: 100%;
  height: 350px;
  border: 1px solid;
  padding: 10px;
  margin: 40px auto;
  border-radius: 50px/50px;
  text-align: center;
}
.post-title {
  margin: 10px;
}
.post-artist {
  text-align: right;
  margin-right: 15px;
}
.post-category {
  text-align: right;
  margin-right: 15px;
}
.post-comment-label {
  text-align: left;
  margin-left: 150px;
  margin-bottom: 0;
}
.post-body {
  width: 80%;
  height: 70px;
  margin: 0 auto;
}
.button {
  width: 40%;
  margin: 0 auto;
}
.contributor {
  text-align: right;
  margin-left: 0px;
  margin-right: 60px;
  margin-bottom: 20px;
}
.icon {
  display: inline;
  margin-right: 500px;
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