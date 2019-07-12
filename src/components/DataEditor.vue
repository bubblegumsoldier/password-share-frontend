<template>
    <div class="editor-container">
        <div class="secret">
            <div class="custom-nav" data-simplebar v-bind:style="{height: cHeight + 'px'}">
                    <tabs
                    :tabs="tabs"
                    :currentTab="currentTab"
                    :wrapper-class="'default-tabs'"
                    :tab-class="'default-tabs__item'"
                    :tab-active-class="'default-tabs__item_active'"
                    :line-class="'default-tabs__active-line'"
                    @onClick="handleTabClick"
                    ref="tabs"
                    />
                    <button class="button add-tab" v-on:click="handleTabAdd()">+</button>
                </div>
            
            <div class="content" data-simplebar>
                <div v-bind:class="{'title-edit':true, 'visible':titleEditVisible}">
                    <CustomField :label="$t('section_title')" v-model="currentTabObject.title" @input="titleChanged()"></CustomField>
                    <hr>
                </div>
                <div class="fields">
                    <transition-group name="slide-fade" tag="span">
                        <div class="row" v-for="(row, index) in currentTabObjectItemsWrapper" :key="row.item.uid">
                            <KeyValuePair @input="handleValueChanged()" v-model="row.item" @removed="function(){handleRemoved(index)}"></KeyValuePair>
                        </div>
                    </transition-group>
                </div>
                <div class="add">
                    <div class="add-field" v-on:click="handleFieldAdd()">
                        <span class="custom-icon add">+</span> <span class="label">{{$t('add_field')}}</span>
                    </div>
                </div>
            </div>
            </tabs>
        </div>
        
    </div>
</template>

<script>
import Tabs from 'vue-tabs-with-active-line'

import Vue from 'vue'

import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';

import KeyValuePair from './KeyValuePair.vue'
import CustomField from './CustomField.vue'

import { uuid } from 'vue-uuid';


export default
{
    name: "DataEditor",
    components: {
        Tabs,
        simplebar,
        KeyValuePair,
        CustomField
    },
    props: {
        value: Object
    },
    data: () => ({
        currentTab: "0",
        currentTabNameInput: "",
        cHeight: 42,
        titleEditVisible: false
    }),
    computed: {
        tabs: function() {
            let tabs = this.value.tabs;
            let rawTabs = tabs.map((tab, i) => {return {title: tab.title, value: i.toString()}});
            return rawTabs;
        },
        currentTabObject: function() {
            return this.value.tabs.find((tab, index) => {return index.toString() == this.currentTab});
        },
        currentTabObjectItemsWrapper : function() {
            return this.currentTabObject.items.map((item, index) => {return {item: item}});
        }
    },
    methods: {
        handleValueChanged()
        {
            this.notifyChange();
        },
        handleTabClick(newTab)
        {
            if(newTab == this.currentTab)
            {
                this.titleEditVisible = !this.titleEditVisible;
            }else
            {
                this.titleEditVisible = false;
            }
            this.currentTabNameInput = this.value.tabs.find((tab, index) => {return index.toString() == newTab}).title;
            console.log(this.currentTabNameInput)
            this.currentTab = newTab;
            console.log(this.titleEditVisible);
        },
        titleChanged()
        {
            console.log("moving line");
            this.$refs.tabs.moveActiveLine(this.currentTab);
            this.notifyChange();
        },
        notifyChange()
        {
            this.$emit('input', this.value);
        },
        handleTabAdd()
        {
            let newTab = {
                title: "Tab " + (this.tabs.length + 1).toString(),
                items: []
            };
            this.value.tabs.push(newTab);
            //Also not nice...
            setTimeout(()=>{
                this.handleTabClick((this.tabs.length - 1).toString());
            }, 200);
            //Not a nice solution but otherwise the simplebar won't recognize the added tab
            this.updateScroller();
            this.notifyChange();
        },
        updateScroller()
        {
            this.cHeight = (this.cHeight == 42) ? 43 : 42;
        },
        handleFieldAdd()
        {
            let item = {
                    type: "text",
                    value: "",
                    label: "",
                    uid: uuid.v1()
                };
            this.currentTabObject.items.push(item);

            var container = this.$el.querySelector(".content");
            this.$scrollTo('.content', container.scrollHeight, { easing: 'ease' });
            this.notifyChange();
        },
        handleRemoved(index)
        {
            console.log(index);
            console.log(this.currentTabObject.items)
            this.currentTabObject.items.splice(index, 1);
            console.log(this.currentTabObject.items);
            this.notifyChange();
        }
    }
}
</script>

<style>

    .custom-nav
    {
        height: 42px;
        overflow-x: auto;
        white-space:nowrap;
        padding-left: 20px;
        padding-right: 20px;
    }
    .row
    {
        margin-bottom: 10px;
    }
    .editor-container
    {
        display: flex;
        flex-flow: column;
        min-height: 280px;
    }
    .content > .add
    {
        flex: 1;
        display: flex;
        align-items: center;
        flex: 1;
    }
    .add-field
    {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.8;
        cursor: pointer;
        transition: 0.2s all ease-in-out;
        margin-top: 20px;
    }
    .add-field:hover
    {
        opacity: 1;
    }
    .add-field .custom-icon.add
    {
        background-color: #2095FC;
        border-radius: 50%;
        height: 32px;
        width: 32px;
        display: flex;
        color: white;
        font-size: 24;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
    }
    .add-field span.label
    {
        font-weight: 500;
        color: #7B7B7B;
        font-size: 18px;
    }

    .secret
    {
        box-sizing: border-box;
        padding-top: 10px;
        text-align: left;
        display: flex;
        flex-flow: column;
        height: 100%;
        flex: 1;
    }

    button.add-tab
    {
        padding: 0;
        height: 20px;
        width: 20px;
        display: flex;
        align-items: center;
        font-size: 18px;
        justify-content: center;
        font-weight: normal;
        display: inline-block;
    }
    
    .content
    {
        display: flex;
        flex-flow: column;
        flex: 1;
        overflow-y: auto;
        height: auto;
        padding-left: 10px;
        padding-right: 10px;
        max-height: 300px;
        min-height: 300px;
    }

    .tabs {
        position: relative;
        margin: 0 auto;
        margin-bottom: 10px;
        text-align: left;
        margin: 0;
        display: inline-block;
    }

    .tabs__item {
        display: inline-block;
        margin: 0 5px;
        padding: 10px;
        padding-bottom: 4px;
        font-size: 13px;
        font-weight: 700;
        color: #7B7B7B;
        color: gray;
        text-decoration: none;
        border: none;
        background-color: transparent;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        transition: all 0.25s;
    }

    .tabs__item_active {
        color: black;
    }

    .tabs__item:hover {
        color: black;
    }

    .tabs__item:focus {
        outline: none;
        color: black;
    }

    .tabs__item:first-child {
    margin-left: 0;
    }

    .tabs__item:last-child {
    margin-right: 0;
    }

    .tabs__active-line {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background-color: #2095FC;
        border-radius: 2px;
        transition: transform 0.4s ease, width 0.4s ease;
    }

    ::placeholder
    {
        color: #ccc !important;
    }

    .title-edit{
        transition: 0.2s max-height ease-in-out;
        max-height: 0px;
        overflow: hidden;
    }

    .title-edit.visible
    {
        max-height: 100px;
    }

    
</style>