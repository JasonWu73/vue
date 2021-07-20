<template>
  <div class="spinner">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .lds-roller {
    display: inline-block;
    position: relative;
    width: 8rem;
    height: 8rem;
  }

  .lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 4rem 4rem;

    &:after {
      content: " ";
      display: block;
      position: absolute;
      width: .7rem;
      height: .7rem;
      border-radius: 50%;
      background: $color-primary-purple;
      margin: -.4rem 0 0 -.4rem;
    }

    &:nth-child(1) {
      animation-delay: -0.036s;
    }

    &:nth-child(1):after {
      top: 6.3rem;
      left: 6.3rem;
    }

    &:nth-child(2) {
      animation-delay: -0.072s;
    }

    &:nth-child(2):after {
      top: 6.8rem;
      left: 5.6rem;
    }

    &:nth-child(3) {
      animation-delay: -0.108s;
    }

    &:nth-child(3):after {
      top: 7.1rem;
      left: 4.8rem;
    }

    &:nth-child(4) {
      animation-delay: -0.144s;
    }

    &:nth-child(4):after {
      top: 7.2rem;
      left: 4rem;
    }

    &:nth-child(5) {
      animation-delay: -0.18s;
    }

    &:nth-child(5):after {
      top: 7.1rem;
      left: 3.2rem;
    }

    &:nth-child(6) {
      animation-delay: -0.216s;
    }

    &:nth-child(6):after {
      top: 6.8rem;
      left: 2.4rem;
    }

    &:nth-child(7) {
      animation-delay: -0.252s;
    }

    &:nth-child(7):after {
      top: 6.3rem;
      left: 1.7rem;
    }

    &:nth-child(8) {
      animation-delay: -0.288s;
    }

    &:nth-child(8):after {
      top: 5.6rem;
      left: 1.2rem;
    }
  }

  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
