<template>
  <div>
    <form class="form" @submit.prevent="searchForStuff">
      <input type="text" v-model="searchText" />
      <button type="submit">Search</button>
    </form>
    <!-- <img src="/IMG_5808.jpg" height="300" /> -->
    <div class="stuff">
      <div v-for="show in myData">
        <img :src="show.show?.image?.medium" alt="movie" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  layout: "custom",
};
import { ref } from "vue";
const searchText = ref("mash");
const myData = ref([]) as any;
async function searchForStuff() {
  console.log("submitted");
  const data = await fetch(`/api/hello?search=${searchText.value}`);
  const json = await data.json();
  myData.value = json.data;
}
</script>
<script setup lang="ts">
//const { data }: { data: any } = await useFetch("/api/hello?search=girls");
const { data }: { data: any } = await useAsyncData("searchData", () => {
  return $fetch("/api/hello?search=mash");
});
</script>
<style>
.stuff {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
</style>