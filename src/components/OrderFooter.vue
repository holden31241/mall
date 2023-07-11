<template>
    <div class="footer">
        <div class="footer-logo">
            <img src="/imgs/logo-footer.png" alt="">
            <p>商城</p>
        </div>
        <div class="footer-link">
            <a href="" target="_blank">主页1</a><span>|</span>
            <a href="" target="_blank">主页2</a><span>|</span>
            <a href="" target="_blank">主页3</a><span>|</span>
            <a href="" target="_blank">主页4</a>
        </div>
        <div class="copyright">Copyright ©2023 <span class="domain">mi.futurefe.com</span> All Rights Reserved.</div>
    </div>
</template>
<script>
export default {
    name: 'nav-footer'
}
</script>
<style lang="scss" scoped>
// scoped 让样式在局部生效，避免冲突
@import './../assets/scss/config.scss';

.footer {
    height: 234px;
    border-top: 4px solid $colorA;
    background-color: $colorB;
    color: $colorD;
    font-size: 16px;
    text-align: center;

    .footer-logo {
        margin-top: 46px;
        margin-bottom: 31px;

        img {
            width: 53px;
            height: 36px;
            margin-bottom: 13px;
        }
    }

    .footer-link {
        a {
            color: $colorD;
            display: inline-block;
        }

        span {
            margin: 0 10px;
        }

        margin-bottom:13px;
    }

    .copyright {
        .domain {
            color: $colorA;
        }
    }
}
</style>