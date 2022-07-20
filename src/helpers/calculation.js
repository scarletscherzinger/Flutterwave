const splitResponse = (transactionDTO) => {
  const { ID, Amount, SplitInfo } = transactionDTO

  //Initial Balance
  let finalBalance = Number(Amount)
  let totalRatio = 0

  const flatSplitTypes = []
  const percentageSplitTypes = []
  const ratioSplitTypes = []

  SplitInfo.forEach((info, index) => {
    switch (info.SplitType) {
      case 'FLAT':
        flatSplitTypes.push({ ...info, index })
        break
      case 'PERCENTAGE':
        percentageSplitTypes.push({ ...info, index })
        break
      case 'RATIO':
        totalRatio += Number(info.SplitValue)
        ratioSplitTypes.push({ ...info, index })
        break
      default:
        break
    }
  })

  //RULE 2
  const allSplitTypes = [].concat(flatSplitTypes, percentageSplitTypes, ratioSplitTypes)

  const finalSplitBreakDown = []
  let ratioBalance

  //Calculation of Split amount for each object in arranged SplitInfo array
  for (let i = 0; i < allSplitTypes.length; i++) {
    const currentSplitInfo = allSplitTypes[i]
    const resObj = {}
    if (currentSplitInfo.SplitType === 'FLAT') {
      finalBalance -= Number(currentSplitInfo.SplitValue)
      resObj['SplitEntityId'] = currentSplitInfo.SplitEntityId
      resObj['Amount'] = currentSplitInfo.SplitValue
      finalSplitBreakDown[currentSplitInfo.index] = resObj
    } else if (currentSplitInfo.SplitType === 'PERCENTAGE') {
      const percentageSplitAmount = (Number(currentSplitInfo.SplitValue) / 100) * finalBalance
      finalBalance -= Number(percentageSplitAmount)
      resObj['SplitEntityId'] = currentSplitInfo.SplitEntityId
      resObj['Amount'] = percentageSplitAmount
      finalSplitBreakDown[currentSplitInfo.index] = resObj
      ratioBalance = finalBalance
    } else if (currentSplitInfo.SplitType === 'RATIO') {
      const openingRatioBalance = ratioBalance
      const ratioSplitAmount = (Number(currentSplitInfo.SplitValue) / totalRatio) * openingRatioBalance
      finalBalance -= Number(ratioSplitAmount)
      resObj['SplitEntityId'] = currentSplitInfo.SplitEntityId
      resObj['Amount'] = ratioSplitAmount
      finalSplitBreakDown[currentSplitInfo.index] = resObj
    }
  }

  //JSON response
  return {
    ID,
    Balance: finalBalance,
    SplitBreakdown: finalSplitBreakDown,
  }
}

export default splitResponse
