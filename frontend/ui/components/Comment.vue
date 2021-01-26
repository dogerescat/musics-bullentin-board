<template>
  <div class="comment-container">
    <p class="comment-label">コメント:</p>
    <p class="comment-body">{{ data.comments[index].body }}</p>
    <div class="icon">
      <div class="like-icon">
        <span>いいね</span>
        <span v-if="likes.isLike">
          <Like @offLike="offLike" />
        </span>
        <span v-if="!likes.isLike">
          <UnLike @onLike="onLike" />
        </span>
        {{ likes.counter }}
      </div>
    </div>
    <div class="button" v-if="myComment">
      <button @click="goEditPage" class="btn3 btn">編集</button>
      <button @click="deleteComment" class="btn4 btn">削除</button>
    </div>
    <div class="comment-contributor">
      <p>投稿者:&nbsp; &nbsp;{{ computedContributor }}</p>
    </div>
  </div>
</template>

<script>
import Like from '../components/Like';
import UnLike from '../components/UnLike';
export default {
  components: { Like, UnLike},  
  data() {
    return {
      contributor: '',
      likes: {
        counter: 0,
        isLike: false,
      },
      myComment: false,
    };
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
    const commentId = this.data.comments[this.index].comment_id;
    const commentUserId = this.data.comments[this.index].user_id;
    const userId = this.$store.state.users.userData.userId;
    this.data.commentLikes.forEach((commentLike) => {
      if (userId === commentLike.user_id && commentId === commentLike.comment_id) {
        this.switchLike();
      }
      if (commentLike.comment_id === commentId) {
        this.increaseLikeCounter();
      }
    });
    if (commentUserId === userId) {
      this.myComment = !this.myComment;
    }
  },
  methods: {
    async onLike() {
      const config = {
        headers: {
          authorization: `Bearer ${this.$store.state.users.userData.token}`
        }
      }
      const res = await this.$axios.$post(`api/comment/likes/${this.data.comments[this.index].comment_id}/${this.$store.state.users.userData.userId}`, null, config);
      const data = await JSON.parse(res);
      if (!data.result) {
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
      const res = await this.$axios.$delete(`api/comment/likes/delete/${this.data.comments[this.index].comment_id}/${this.$store.state.users.userData.userId}`, config);
      const data = await JSON.parse(res);
      if (!data.result) {
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
      this.$router.push(`/comments/edit/${this.data.comments[this.index].comment_id}`);
    },
    async deleteComment() {
      const token = this.$store.state.users.userData.token;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const commentId = this.data.comments[this.index].comment_id;
      const res = await this.$axios.$delete(
        `api/comments/delete/${commentId}`,
        config
      );
      const data = JSON.parse(res);
      if(!data.result) {
        this.$store.commit('errors/setError', data.error);
        return;
      }
      this.$emit('deleteComment', this.index);
    },
  },
  computed: {
    computedContributor() {
      this.data.users.forEach((user) => {
        if (user.user_id === this.data.comments[this.index].user_id) {
          this.contributor = user.name;
        }
      });
      return this.contributor;
    },
  },
};
</script>

<style scoped>
.comment-container {
  width: 70%;
  height: 210px;
  border: 1px solid;
  box-shadow: 0 10px 20px 0 rgb(97, 96, 96);
  padding: 15px;
  margin: 40px auto;
  border-radius: 50px/50px;
  text-align: center;
}

.btn4 {
  display: inline;
  height: 30px;
  width: 80px;
  line-height: 20px;
  background: #ce5c65;
  color: #575757;
  box-shadow: 0 5px 5px 0 rgb(97, 96, 96);
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  margin-left: 20px;
}
.btn3 {
  display: inline;
  height: 30px;
  width: 80px;
  line-height: 20px;
  background: #aaefe7;
  color: #474747;
  box-shadow: 0 5px 5px 0 rgb(97, 96, 96);
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  margin-right: 20px;
}
.comment-label {
  text-align: left;
  margin-left: 150px;
  margin-bottom: 0;
}
.comment-body {
  width: 80%;
  height: 70px;
  margin: 0 auto;
}
.comment-contributor {
  text-align: right;
  margin-left: 0px;
  margin-right: 60px;
  margin-bottom: 20px;
}
</style>