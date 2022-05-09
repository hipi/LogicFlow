import { css } from '../../../static/lit.js'
export default css`
  .tips {
    width: 120px;
    line-height: 28px;
    background: rgba(41,97,239,0.08);
    border: 1px solid #2961EF;
    border-radius: 2px;
    font-size: 14px;
    color: #2961EF;
    text-align: center;
    font-weight: 500;
    margin: 12px auto;
  }
  .category-name {
    line-height: 20px;
    color: #A8ADBD;
    margin-left: 16px;
    font-size: 14px;
  }
  .widgets {
    margin: 10px 16px;
    border-left: 1px solid #E4E7ED;
    border-top: 1px solid #E4E7ED;
    float: left;
    list-style:none;
    padding: 0;
  }
  .widgets:after {
    content: "";
    clear: both;
  }
  .widget-item {
    border-right: 1px solid #E4E7ED;
    border-bottom: 1px solid #E4E7ED;
    float: left;
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    font-size: 12px;
    color: #505568;
    text-align: center;
    cursor: pointer;
  }
  .widget-icon {
    width: 32px;
    height: 32px;
    margin: 15px auto 0 auto;
    display: block;
  }
`