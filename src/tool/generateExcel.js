//生成excel文件

function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => {
    if (j === 'timestamp') {
      return parseTime(v[j])
    } else {
      return v[j]
    }
  }))
}

export default (config)=>
{
  import('@/assets/js/Export2Excel').then(excel => {
    let header = [],filterVal=[];
    for(let c of config.columns){
      header.push(c.label);
      filterVal.push(c.prop);
    }
    let list = formatJson(filterVal, config.data)
    excel.export_json_to_excel({
      header: header,
      data:list,
      filename: config.fileName,
      autoWidth: config.autoWidth,
      bookType: config.fileType
    })
  })
}