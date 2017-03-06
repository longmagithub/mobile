<template>
<div id='cang'>
		<mt-header fixed title="藏头诗生成">
    </mt-header>
	<mt-field class='bottom_line' 
			label="藏头内容" 
			ref='keywordInput'
			:attr="{ maxlength: 8 }" 
			placeholder="不超过8个字">
	</mt-field>
	<mt-radio
		title="类型"
		v-model="cangNum"
		:options="cangType">
	</mt-radio>
	<div id='positionList'>
		<mt-button size='small'
			v-for='(item, index) in positionList' 
			v-on:click='position=index'
			v-bind:type='index==position?"primary":"default"'>
			{{item.text}}
		</mt-button>
	</div>
	<mt-radio
		title="韵脚"
		v-model="yunNum"
		:options="yayunList">
	</mt-radio>
	<mt-button size="large" type='primary' v-on:click='generate'>生成</mt-button>
	
	<div id='cangContent'>
		<div class='cangItem' v-for='item in resultList'>
			<p v-for='sentence in item'>{{sentence}}</p>
		</div>
	</div>

</div>
</template>
<script>
import { Field, Cell, Radio } from 'mint-ui'
import Vue from 'vue'
Vue.component(Field.name, Field, Cell.name, Cell, Radio.name, Radio)
import store from '../vuex/store.js'
export default {
  name: 'cang',
  data () {
    return {
			keyword: '3',
      cangNum: '5',
      cangType: [],
			sheetVisible: false,
			position: 0,
			positionList: this.$store.state.cang.positionList,
			yunNum: '1',
			yayunList: this.$store.state.cang.yayunList
    }
  },
	computed: {
		resultList: function () {
			return this.$store.state.cang.resultList
		}
	},
  created: function () {
    this.cangType = this.$store.state.cang.cangType
  },
	methods: {
		generate: function () {
			let params = {
				num: this.cangNum,
				type: this.positionList[this.position].typeNum,
				yayun: this.yunNum,
				key: this.$refs.keywordInput.currentValue.trim()
			}
			store.dispatch('generateCang', params)
		}
	},
  store: store
}
</script>
<style scoped>
#cang{
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 30px 6%;
	padding-bottom: 45px;
}
#cang>*{
	margin-bottom: 25px;
}
.mint-radio-core::after{
	top: 6px;
  left: 6px;
}
#positionList{
	box-sizing: border-box;
	display: flex;
	width: 100%;
}
#positionList>button{
	flex:1;
}
#cangContent{
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #F7F7F7
}
</style>
