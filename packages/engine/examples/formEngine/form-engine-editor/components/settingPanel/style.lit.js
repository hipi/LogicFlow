import { css } from '../../../static/lit.js'
export default css`
  .facile_panel {
    padding: 16px;
    font-size: 14px;
  }
  .facile_setting-view {
    pointer-events: none;
  }
  .setting-nocontent {
    padding: 16px;
    text-align: center;
    font-size: 16px;
    color: #303A51;
  }
  /* common */
  .item-content-label {
    color: #505568;
    line-height: 20px;
  }
  .item-input-name {
    display: inline-block;
    width: 49%!important;
  }
  .item-content-isIndependent {
    margin-bottom: 5px;
  }
  .flex-wrap  {
    display: flex;
  }
  /* ImSelect组件设置 start */
  .item-title {
    font-family: PingFangSC-Medium;
    color: #303A51;
    line-height: 20px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  .item-content {
    margin-bottom: 15px;
    color: #606266;
  }
  .item-content-ctrl {
    margin-top: 5px;
  }
  .item-input {
    background: rgba(215,218,229,0.12);
    border: 1px solid #EBEEF5;
    border-radius: 4px;
    height: 30px;
    color: #A8ADBD;
    line-height: 28px;
    text-indent: 8px;
  }
  .copy-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    width: 180px;
  }
  .copy-text-btn {
    font-size: 14px;
    color: rgb(41, 97, 239);
    float: right;
    margin-right: 10px;
    line-height: 30px;
    cursor: pointer;
  }
  .im-select-setting .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  .item-li {
    display: flex;
    margin-bottom: 8px;
    align-items: center;
  }
  .item-li-row1 {
    width: 50px;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .item-li-row1-label {
    color: #2961EF;
    text-align: center;
    line-height: 23px;
    display: block;
    background: #F3F6FA;
    border-radius: 4px;
  }
  .item-li-row2 {
    width: 16px;
    text-align: center;
    color: #DCDFE6;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .item-li-row3 {
    width: 100%;
  }
  .item-li-row4,.item-li-row5 {
    width: 16px;
    height: 16px;
    display: block;
    flex-shrink: 0;
    cursor: pointer;
  }
  .item-li-row4 {
    padding: 0 3px;
  }
  .item-li-drag {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAABP5JREFUeF7tnL1rlFkUxs+N2agpFkRZWIiCYLFooSg6kykWJa8f72hrUCy22VJb/Ru01T/ALiGBLTYyo+zo+FGYEW2EBCxWJeA2gq2omfcuE5Dowuqcey43h3ue1Ofc8zzP+XFm0owj/JlOwJl2D/MEAIxDAAAAgPEEjNvHBQAAxhMwbh8XAAAYT8C4fVwAAGA8AeP2cQEAgPEEjNvHBQAAxhMwbh8XAAAYT8C4fVwAAGA8AeP2cQEAgPEEjNuPdgFud5/t8asfJ4znmcR+342unCkOv4wxLAoA7U5vjojOxhCEN4ZOYL4satNDV/9PoRiAVqd31RFdlgpBPz8BT3StWdSu8DvXO0QA3Hr0aNumD2PvJALQK0vArfa3nzrVCN6BCIA79xYPVZV7KrOAbkkCVb+qnz452Qt9QwbAgyc7q09+JXQ4+iIk8KnaXZaTr0NfEgEwGNruLM4QuXOhAtAnScDPlkX9vOQFMQCtzuJe59wcedonEYJeZgKOlrz3082ivszs/KpcDMDgtQEERO43R+6IRAx6h0zAV3e8oz+lyx9MiwLAkLJRpjABAKBwKSklAYCUaSucBQAULiWlJACQMm2FswCAwqWklAQAUqatcBYAULiUlJIAQMq0Fc4CAAqXklISAEiZtsJZAEDhUlJKAgAp01Y4CwAoXEpKSQAgZdoKZwEAhUtJKQkApExb4SwAoHApKSUBgJRpK5wFABQuJaUkAJAybYWzAIDCpaSUBABSpq1wFgBQuJSUkgBAyrQVzgIACpeSUhIASJm2wlkAQOFSUkoCACnTVjgLAChcSkpJUQBodZ5ccES/E/mjKcXbneUWqOr/UZ6YvCnNQAxA627vovN0XSoE/fwEvKNLzanaDX7neocIgG731ZYP/bcvPPldEhHoDUvAkVv5cXz1l0aj8T7sBeEPRKz9PAy5pdDh6IuRgN9fFvXnoS+JLgAACI09Zt8GAoCPgJiL5L+14R8BA8n4EshfXKyODf8S+NkI/g2MtdJh31H0b+CwklGnMwHRl0CdlqCKkwAA4KSVYS0AyHCpHEsAgJNWhrUAIMOlciwBAE5aGdYCgAyXyrEEADhpZVgLADJcKscSAOCklWEtAMhwqRxLAICTVoa1ACDDpXIsAQBOWhnWAoAMl8qxBAA4aWVYCwAyXCrHEgDgpJVhLQDIcKkcSwCAk1aGtQAgw6VyLAEATloZ1gKADJfKsQQAOGllWAsAMlwqxxIA4KSVYS0AyHCpHEsAgJNWhrUAIMOlcixFAWDwSyEjzjX6VTXBGY7asAQ2jYz+Xfn+s2ZRXw57Yb1LDMDaz8Q4N0ee9knFoJ+RgKMl7/20FAIxAO3O4gyRO8eQjtJoCfjZsqiflzwnAuD2w6c/+4/9fyQC0CtLYMxtnpiaOvAm9BURAO2/Hh8lN9INHY6+CAn46lh5fPJ+6EsiABYWujtGt46/DR2OPnkCfuyHn5q/HgzegQiAgfxWp3fVEV2WW8EL3AQ80bVmUbvC7fuyXgzA4LF2pzdHRGclQtDLTmC+LGrT7K7/NEQBYO0S3H1c+opqUkHo/34CI0T3JZ/70S/A9yWjQmsC0S6AVoPQ9e0EAIBxQgAAADCegHH7uAAAwHgCxu3jAgAA4wkYt48LAACMJ2DcPi4AADCegHH7uAAAwHgCxu3jAgAA4wkYt48LAACMJ2DcPi4AADCegHH7/wLFi9CBpYTw7QAAAABJRU5ErkJggg==') center center no-repeat;
    background-size: contain;
  }
  .item-li-delete {
    background: url('data:image/png;base64,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') center center no-repeat;
    background-size: contain;
  }
  .item-li-add {
    display: flex;
    justify-content: center;
  }
  /* ImSelect组件设置 end */

  /* ImAnswer组件设置 start */
  .qid-detail {
    margin-top: 10px;
    font-size: 14px;
    color: #A8ADBD;
    line-height: 22px;
    background: rgba(215,218,229,0.12);
    border: 1px solid #EBEEF5;
    border-radius: 4px;
    padding: 10px;
  }
  .qid-detail-label {
    flex-shrink: 0;
  }
  .qid-detail-content {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
    white-space: nowrap;
  }
  /* API选择 */
  .api-input-item {
    display: flex;
  }
  .api-input-item .el-select .el-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .api-input-button.el-button {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-sizing: border-box;
    padding-left: 5px;
    padding-right: 5px;
  }
  .api-detail {
    margin-top: 10px ;
    font-size: 14px;
    color: #A8ADBD;
    line-height: 22px;
    background: rgba(215,218,229,0.12);
    border: 1 px solid #EBEEF5;
    border-radius: 4px;
    padding: 10px;
  }
  .api-detail-item {
    display: flex;
  }
  .api-detail-label {
    flex-shrink: 0;
  }
  .api-detail-content {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
    white-space: nowrap;
  }
  /* 规则设置 */
  .rule-item {
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #f1f1f1;
    padding: 5px;
    margin-bottom: 5px;
    color: #333;
  }
  .rule-item .rule-item-line{
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 5px;
  }
  .rule-item .rule-item-line .label {
    width: 70px;
  }
  .rule-item .rule-item-line .value {
    flex: 1;
  }
  .tenant-select {
    width: 100px;
    margin-right: 10px; 
  }
  .business-select {
    flex: 1;
  }
  .filter-content {
    border: 1px solid #ddd;
    border-radius: 2px;
    font-size: 14px;
    min-height: 80px;
    padding: 5px;
    line-height: 24px;
  }
  .filter-content-btn {
    margin-top: 10px;
  }
  .filter-relation {
    color: rgb(41, 97, 239);
  }
  .filter-item-relation {
    color: rgb(41, 97, 239);
    font-size: 12px;
  }
  .el-drawer__header {
    margin-bottom: 20px;
  }
  .im-bill-radio {
    display: flex;
    flex-direction: column;
  }
  .im-bill-radio .el-radio {
    margin-bottom: 5px;
  }
`