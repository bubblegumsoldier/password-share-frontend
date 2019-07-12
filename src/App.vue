<template>
  <div id="app">
    <CreatePage></CreatePage>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import CreatePage from './components/CreatePage.vue'
import WhiteContainer from './components/WhiteContainer.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    CreatePage,
    WhiteContainer
  }
}
</script>

<style>
body
{
  margin: 0;
  padding: 0;
}
#app {
  font-family: proxima-nova, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #7B7B7B;
  margin: 0;
  padding: 0;
}

.button
{
  background-color: #2095FC;
  border-radius: 16px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-weight: 600;
  outline: 0;
  border: 0;
  transition: 0.2s all ease-in-out;
  box-sizing: border-box;
  text-decoration: none;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
  opacity: 0.8;
}

button:hover
{
  opacity: 1;
}

button:active
{
  padding-top: 2px;
}

.sub-button
{
  color: #7B7B7B;
  font-size: 13px;
  margin-top: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  display: block;
}

.sub-button:hover
{
  color: #4D4D4D;
}

p
{
  color: #7B7B7B;
  font-size: 13px;
}

p.text-light,
p.text-light a
{
  color: white !important;
  transition: 0.2s all ease-in-out;
}

p a
{
  text-decoration: none;
}

p.text-light a:hover
{
  color: #ddd !important;
}

form
{
  box-sizing: border-box;
}

input[type=text],
input[type=email]
{
  background-color: transparent;
  border: 0;
  outline: 0;
  font-size: 13px;
  color: #7B7B7B;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 32px;
  border-bottom: #707070;
  padding-right: 20px;
  box-sizing: border-box;
  width: 100%;
}

hr
{
  border-top: 0;
  border-bottom-color: #707070;
  opacity: 0.4;
}

@media screen and (max-width: 1100px)
{
  h1
  {
    font-size: 40px !important;
  }
}


.tooltip {
  display: block !important;
  z-index: 10000;
}
 
.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}
 
.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}
 
.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}
 
.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
 
.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}
 
.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
 
.tooltip[x-placement^="right"] {
  margin-left: 5px;
}
 
.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
 
.tooltip[x-placement^="left"] {
  margin-right: 5px;
}
 
.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
 
.tooltip.popover .popover-inner {
  background: #2095FC;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}
 
.tooltip.popover .popover-arrow {
  border-color: #2095FC;
}
 
.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}
 
.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}

.slide-fade-enter-active {
    transition: all .2s ease-out;
    max-height: 100px;
}
.slide-fade-leave-active {
    transition: all .2s ease-out;
    max-height: 100px;
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
    max-height: 0;
}

.fade-enter-active {
    transition: all .2s ease-out;
}
.fade-leave-active {
    transition: all .2s ease-out;
}
.fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.fade-enter-to
{
  opacity: 1;
}

a button.button
{
    text-decoration: none !important;
}

a
{
  text-decoration: none;
}
</style>
