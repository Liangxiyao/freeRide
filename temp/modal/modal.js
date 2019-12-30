
Component({
  data: {
    // showModal: Boolean,
    // modal: {
    //   type:Object
    // }
  },
  properties: {
    showModal: Boolean,
    modal: {
      type:Object
    }
  },
  options: {
    multipleSlots:true
  },
  methods: {
    submit: function () {
      this.setData({
        showModal: true
      })
    },
  
    preventTouchMove: function () {
  
    },
    go: function () {
      this.setData({
        showModal: false
      })
    }
  }
  
})
