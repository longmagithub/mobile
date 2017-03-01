<template>
  <div id="newsContent">
    <newsDetail></newsDetail>
    <mt-header fixed title="新闻">
        <i slot='right' class="fa fa-search" aria-hidden="true"></i>
    </mt-header>
    <newsList></newsList>
    <channel></channel>
  </div>
</template>

<script>
  import channel from './subCom/channel'
  import newsList from './subCom/newsList'
  import newsDetail from './subCom/newsDetail'
export default {
    name: 'newsContent',
    components: {
      channel,
      newsList,
      newsDetail
    }
}
</script>

<style>
#newsContent{
  position: relative;
}
.mint-popup-right{
  height: 100%;
}
</style>
