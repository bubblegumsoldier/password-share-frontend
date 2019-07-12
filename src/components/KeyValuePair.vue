<template>
    <div class="split">
        <div class="left">
            <CustomField :label="$t('description')" v-model="key" :initFocus="true" @input="handleInput()" ref="key"></CustomField>
        </div>
        <div class="right">
            <CustomField :label="$t('value')" v-model="val" @input="handleInput()" ref="val"></CustomField>
        </div>
        <div class="very-right">
            <button class="remove" v-on:click="onRemove" tabindex="-1">X</button>
        </div>
    </div>
</template>

<script>
import CustomField from './CustomField.vue';

export default
{
    name: 'KeyValuePair',
    components: {
        CustomField
    },
    props: {
        value : Object
    },
    data: () => ({
        key : "",
        val : ""
    }),
    mounted() {
        this.$nextTick( () => {
            if(this.value)
            {
                this.key = this.value.label;
                this.val = this.value.value;
            }
        })
    },
    methods: {
        handleInput()
        {
            let v = this.value;
            v.value = this.val;
            v.label = this.key;
            this.$emit('input', v);
        },
        onRemove()
        {
            this.$emit("removed", null);
        },
        createLink()
        {

        }
    }
}
</script>

<style>
    .split
    {
        display: flex;
    }

    .split .left,
    .split .right
    {
        flex: 1;
    }

    .very-right
    {
        display: flex;
        align-items: center;
    }

    button.remove
    {
        outline: 0;
        border: 0;
        background: transparent;
        font-weight: bold;
        background-color: #666;
        margin-right: 10px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-family: monospace;
        opacity: 0.7;
        transition: 0.2s all ease-in-out;
        cursor:  pointer;
    }

    button.remove:hover
    {
        opacity: 1;
    }
</style>