<template>
    <div class="body">
        <div class="horizontal-split">
            <div class="left">
                <div class="white-container-parent">
                    <WhiteContainer>
                        <div v-if="link == null">
                            <DataEditor v-model="secret"></DataEditor>
                            <hr>
                            <form>
                                <div class="input">
                                    <CustomField :label="$t('your_email_address')" v-model="email"></CustomField>
                                </div>
                            </form>
                            <hr>
                            <div class="bottom-row">
                                <button class="button" v-on:click="handleLinkCreate" :disabled="loading">{{loading ? $t('loading') : $t('create_link')}}</button>
                            </div>
                        </div>
                        <transition name="fade">
                            <div class="result-wrapper" v-if="link != null">
                                <h2>{{$t('share_this_link')}}</h2>
                                <p>{{$t('share_this_link_description')}}</p>
                                <hr>
                                <CustomField 
                                    :editable="false"
                                    v-model="link"
                                    label="Link zum Teilen"
                                    :initFocus="true"
                                    :autoSelect="true"
                                    />
                                <hr>
                                <div style="margin-bottom: 20px"></div>
                                <a :href="'mailto:?body=' + encodeURI(link) + ''" class="share-via-email"><button class="share-via-email button">{{$t('share_via_email')}}</button></a>
                                <a href="" class="sub-button">{{$t('create_new')}}</a>
                            </div>
                        </transition>
                    </WhiteContainer>
                </div>
            </div>
            <div v-bind:class="{'right':true, 'hidden': (link != null)}">
                <div class="right-content">
                    <div class="headline">
                        <h1 v-html="$t('headline')" ></h1> <a href="#"><button class="button read-more">{{$t('read_more')}}</button></a>
                    </div>
                    <p class="text-light"><a href="impressum">{{$t('impressum')}}</a> <a href="datenschutz">{{$t('data_privacy')}}</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import WhiteContainer from './WhiteContainer.vue'
import DataEditor from './DataEditor.vue';

import Communicator from '../services/Communicator.js';
import CustomField from './CustomField.vue';

export default {
  name: 'CreatePage',
  props: {
    msg: String
  },
  data: () => ({
    secret: {
        tabs: [{
            title: "Tab 1",
            items: []
        }]
    },
    email: "",
    link: null,
    loading: false
  }),
  components: {
    WhiteContainer,
    DataEditor,
    CustomField
  },
  methods: {
    async handleLinkCreate()
    {
        this.loading = true;
        this.link = await Communicator.createLink(this.secret, this.email);
        this.loading = false;
    }
  }
}
</script>

<style scoped>
.body
{
    min-height: 100vh;
    background-image: url(https://unsplash.com/photos/tk_iTI_gvFk/download?force=true);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
}

.horizontal-split
{
    display: flex;
    height: 100%;
    width: 100%;
}

.left
{
    flex: 1;
    display: flex;
    justify-content: center;
}

.right
{
    flex: 2;
    overflow: hidden;
    transition: 0.5s all ease-in-out;
}

.right.hidden
{
    flex: 0;
    opacity: 0;
}

.headline
{
    display: block;
    text-align: left;
}

h1
{
    opacity: 0.8;
    font-size: 80px;
    font-weight: 800;
    color: white;
    text-align: left;
    display: inline;
}

.button.read-more
{
    display: inline-block;
    margin-top: -30px;
    margin-left: 20px;
}

p
{
    text-align: left;
}

p a:first-child
{
    margin-right: 20px;
}

.white-container-parent
{
    width: 50%;
    margin: auto;
    min-width: 300px;
    margin-left: 20px;
    margin-right: 20px;
}

.bottom-row
{
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media screen and (max-width: 676px)
{
  .horizontal-split
  {
      flex-flow: column;
  }
  .body
  {
      align-items: flex-start;
  }
  .left
  {
      padding-top: 40px;
      padding-bottom: 40px;
  }
  .right-content
  {
      width: 50%;
      min-width: 250px;
      margin: auto;
  }
}

@media screen and (max-width: 1100px)
{
    .right
    {
        flex: 1;
    }
}

h2
{
    font-size: 18pt;
    font-weight: 600;
    color: #7B7B7B;
}

.result-wrapper
{
    padding: 20px;
    max-width: 400px;
    margin: auto;
    overflow: hidden;
}

.share-via-email
{
    margin: auto;
}


</style>