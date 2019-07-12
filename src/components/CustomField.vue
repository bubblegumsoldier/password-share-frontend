<template>
    <div class="custom-input">
        <label v-bind:class="{'move-label':true, 'focus':focus}" v-on:click="handleOnFocus()" >{{label}}</label>
        <input :type="type" :readonly="!editable" ref="input" @focus="handleOnFocus($event)" v-on:blur="handleOnBlur" class="input" :value="value" @input="updateValue()"></input>
    </div>
</template>

<script>

export default
{
    props: {
        value: String,
        type: {
            type: String,
            default: "text"
        },
        enableCopy : {
            type: Boolean,
            default: false
        },
        editable : {
            type: Boolean,
            default: true
        },
        label :String,
        initFocus: Boolean,
        autoSelect: Boolean
    },
    watch: {
        value: function()
        {
            if(this.value.length > 0)
            {
                this.focus = true;
            }
        }
    },
    mounted() {
        this.$nextTick( () => {
            console.log(this.value);
            if(this.value.length > 0)
            {
                this.focus = true;
            }
            if(this.initFocus)
            {
                this.handleOnFocus();
            }
        })
    },
    data: () => (
        {
            focus: false
        }
    ),
    methods: {
        updateValue() {
            console.log("value updated");
            this.$emit('input', this.$refs.input.value);
        },
        handleOnFocus(e)
        {
            this.focus = true;
            console.log("focus");
            this.$refs.input.focus();
            if(this.autoSelect && e && e.target)
            {
                e.target.select();
            }
        },
        handleOnBlur()
        {
            if(this.value.length > 0)
            {
                return;
            }
            this.focus = false;
            console.log("unfocus");
        },
        handleEditClick()
        {
            console.log("edit click");
        }
    }
}

</script>

<style scoped>
.custom-input
{
    position: relative;
}
.move-label
{
    cursor: text;
    position: absolute;
    left: 20px;
    top: 11px;
    transition: 0.2s all ease-in-out;
    display: flex;
}
.move-label.focus
{
    top: 0;
    left: 15px;
    font-size: 12px;
    font-weight: bold;
}
input.input
{
    height: 40px !important;
    padding-left: 20px;
    padding-top: 20px;
}
.edit-label.button
{
    padding: 0 ;
    height: 20px ;
    width: 20px ;
    display: flex;
    font-weight: normal;
    font-size: 10px ;
    margin-left: 5px;
}
</style>