const returnsConfirmationDefaultPageLength = 150;
var offlineFlag = localStorage.getItem('offline');

var externalDPLTemplate = "{"
+ "&quot;Source&quot;:&quot;EXTERNALDPL&quot;"
+ "}~"
+"{"
+ "&quot;PRINTDATA&quot;:&quot;{{PRINTTEMPLATESTRING}}&quot;,"
+ "&quot;SHOULDPRINTKOHLSWATERMARK&quot;:&quot;TRUE&quot;"
+ "}";

var externalDPLPrintObj = "{"
+ "&quot;Source&quot;:&quot;EXTERNALDPL&quot;"
+ "}~"
+"{"
+ "&quot;PRINTDATA&quot;:&quot;{{PRINTTEMPLATESTRING}}&quot;,"
+ "&quot;SHOULDPRINTKOHLSWATERMARK&quot;:&quot;TRUE&quot;"
+ "}";

var returnsConfirmationTemplate = "Q1\n"
+ "JC\n"
+ "3911S68{{HEADER}}020000400040 Returns Confirmation \n"
+ "3911S68{{TEXT1}}020000220022 We've got it from here! Your refund will be processed within \n"
+ "3911S68{{TEXT2}}020000220022 24 hours and your item(s) returned to Amazon within 21 days. \n"
+ "3911S68{{TEXT3}}020000220022 Visit amazon.com/cs for questions. \n"
+ "3911S68{{TEXT4}}020000250025 Store #: {{STORENUMBER}} \n"
+ "3911S68{{TEXT5}}020000250025 Date/Time: {{DATETIME}} \n"
+ "3911S68{{TEXT6}}020000250025 Tracking ID: {{TRACKINGID}} \n"
+ "Q1\n";

var rmaLabelPrintTemplate = "^02KcSTC;\n"
+ "^02KcLW412;\n"
+ "^02KcCL550;\n"
+ "^02L\n"
+ "D11\n"
+ "FA+\n"
+ "JL\n"
+ "1Y1100000050140Kohls180.DIM\n"
+ "3911S680060039500250025 {{FROMADDRESS1}}\n"
+ "3911S680075039500250025 {{FROMADDRESS2}}\n"
+ "3911S680090039500250025 {{FROMADDRESS3}}\n"
+ "3911S680105039500250025 {{FROMADDRESS4}}\n"
+ "3911S680150025000250020 {{RCADDRESS1}}\n"
+ "3911S680165025000250020 {{RCADDRESS2}}\n"
+ "3911S680180025000250020 {{RCADDRESS3}}\n"
+ "3911S680195025000250020 {{RCADDRESS4}}\n"
+ "JC\n"
+ "3911S680270020000300030 {{RMAID}}\n"
+ "3e2205003250260{{RMAID}}\n"
+ "3e3304004350340{{TRACKINGID}}\n"
+ "3911S680450020000300030 {{TRACKINGID}}\n"
+ "JL\n"
+ "3911S680480040000250020 {{NOTE1}}\n"
+ "3911S680480006000250020 {{NOTE2}}\n"
+ "3911S680495006000200020 {{TODAY}}\n"
+ "3911S680530041200180018 ------------------------------------------------------------------------------------------------------------------------------------------------------\n"
+ "Q{{TICKETCOUNT}}\n"
+ "E\n";

var offlineCouponTemplateString = "^02KcSTC;\n"
+ "^02KcLW412;\n"
+ "^02KcCL465;\n"
+ "^02L\n"
+ "D11\n"
+ "FA+\n"
+ "JC\n"
+ "3911S680010020000250025 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n"
+ "1Y1100000150130Kohls180\n"
+ "ySU8\n"
+ "3911S680018012800200020 ®\n"
+ "3911S680050020000250020 Thanks for visiting us today.\n"
+ "3911S680065020000250020 We'd like to offer you this Kohl's savings pass.\n"
+ "3911S680080020000250020 Happy shopping!\n"
+ "3911S650105020000400040 TAKE AN EXTRA\n"
+ "JR\n"
+ "3911S700205015002500250 25\n"
+ "JL\n"
+ "3911S700155016001000100 %\n"
+ "3911S700205016000800080 Off\n"
+ "JC\n"
+ "3911S680235020000250020 VALID {{TODAY}}. IN STORE ONLY.\n"
+ "3911S680250020000250020 See below for details and exclusions.\n"
+ "3911S680265020000250025 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n"
+ "JL\n"
+ "3911S700280039500300025 25% OFFER IS VALID FOR ONE TRANSACTION {{TODAY}},\n"
+ "3911S700295039500300025 IN STORE ONLY WITH ANY TENDER TYPE.\n"
+ "3911S700320039500180018 Surrender coupon for in-store purchase to receive discount. Limit one offer per customer. \n"
+ "3911S700330039500180018 DOLLAR-OFF DISCOUNTS, INCLUDING KOHL'S CASH® COUPONS, YES2YOU REWARDS® \n"
+ "3911S700340039500180018 AND PROMOTIONAL GIFTS, WILL BE APPLIED PRIOR TO PERCENT-OFF TOTAL PURCHASE \n"
+ "3911S700350039500180018 DISCOUNTS/COUPONS. Offer cannot be used in conjunction with other percent-off discounts, \n"
+ "3911S700360039500180018 including age-specific discounts. Offer not valid on the following categories and brands of \n"
+ "3911S700370039500180018 merchandise: Gift Cards; Kohl’s Cares® cause merchandise or other charitable items; select \n"
+ "3911S700380039500180018 online-exclusives; premium athletic; beauty and fragrance; consumables; Curated by Kohl's \n"
+ "3911S700390039500180018 brands; select electrics; premium electronics; sporting goods; sports team merchandise; \n"
+ "3911S700400039500180018 premium sunglasses; toys; Columbia; Dyson; KitchenAid; Koolaburra by UGG; Levi's; S'well; \n"
+ "3911S700410039500180018 and Timberland. See complete list of exclusions at Kohls.com/exclusions or look for signs \n"
+ "3911S700420039500180018 in store. Offer also not valid on price adjustments on prior purchases; payment on a Kohl’s \n"
+ "3911S700430039500180018 Charge account; taxes, shipping and/or handling fees. Reproductions or duplicates not \n"
+ "3911S700440039500180018 accepted. Offer is nontransferable. See associate for details. \n"
+ "JC\n"
+ "3911S680455020000250025 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n"
+ "Q1\n"
+ "E\n";

var apologyHeaderTemplate = "Q1\n"
+ "JC\n"
+ "3911S68{{TEXT1}}020000250025 Store #: {{STORENUMBER}}\n"
+ "3911S68{{TEXT2}}020000250025 Date/Time: {{DATETIME}}\n"
+ "3911S68{{END}}020000250025 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n"
+ "Q1\n";

var holdLabelTemplateString = "^02KcSTC;\n"
+ "^02KcLW412;\n"
+ "^02KcCL280;\n"
+ "^02L\n"
+ "D11\n"
+ "FA+\n"
+ "JC\n"
+ "3911S650025020000500050 HOLD\n"
+ "3911S680045020000250025 Date/Time: {{DATETIME}}\n"
+ "3911S680065020000250025 Affix this label to the package and set\n"
+ "3911S680085020000250025 aside to process when back online.\n"
+ "JC\n"
+ "3W1D6600002200250HA,{{QRCode}}\n"
+ "JC\n"
+ "3911S650250020000300030 {{TRACKINGID}}\n"
+ "3911S680270020000180018 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n"
+ "Q1\n"
+ "E";

function mapTVSResponseToPrintTemplate(tvsResponse, templateString, isApology) {
	var d = new Date();
	var date = String("00" + (d.getMonth() + 1)).slice(-2) + "/" +
		String("00" + d.getDate()).slice(-2) + "/" +
		d.getFullYear() + "  " +
		String("00" + d.getHours()).slice(-2) + ":" +
		String("00" + d.getMinutes()).slice(-2);
	var kcCLValue = templateString.match(/KcCL\d*/g);

	templateString = templateString.replace(/{{STORENUMBER}}/g, window.localStorage.getItem("storeId"))
					.replace(/{{DATETIME}}/g, date)
					//.replace(/{{TRACKINGID}}/g, localStorage.getItem("trackingId"))
					.replace(/{{DURATION}}/g, tvsResponse.durationInDays)
					.replace(/{{TODAY}}/g, date)
					.replace(/{{SUPCBARCODE}}/g, tvsResponse.upc)
					.replace(/{{DOLLAROFF}}/g, tvsResponse.offer.discount.dollarOff)
					.replace(/{{PERCENTOFF}}/g, tvsResponse.offer.discount.percentOff)
					.replace(/{{PRICEPOINT}}/g, tvsResponse.offer.discount.pricePoint)
					.replace(/{{PRORATED}}/g, tvsResponse.offer.discount.prorated)
					.replace(/{{CHANNEL}}/g, tvsResponse.channel);

	if (tvsResponse.offer.dates != null) {
		if (tvsResponse.offer.dates.digital != null) {
			templateString = templateString.replace(/{{DIGITALSTARTTIME}}/g, formatTVSDateFormatToCouponDate(tvsResponse.offer.dates.digital.startTime))
								.replace(/{{DIGITALENDTIME}}/g, formatTVSDateFormatToCouponDate(tvsResponse.offer.dates.digital.endTime));
		}
		if (tvsResponse.offer.dates.store != null) {
			templateString = templateString.replace(/{{STORESTARTDATE}}/g, formatTVSDateFormatToCouponDate(tvsResponse.offer.dates.store.startDate))
								.replace(/{{STOREENDDATE}}/g, formatTVSDateFormatToCouponDate(tvsResponse.offer.dates.store.endDate));
		}
	}

	if (tvsResponse.offer.restrictions != null) {
		templateString = templateString.replace(/{{RESTCITIONSDESCRIPTION}}/g, tvsResponse.offer.restrictions.description)
							.replace(/{{PAYMENTTYPES}}/g, tvsResponse.offer.restrictions.paymentTypes)
							.replace(/{{CUSTOMERSEGMENTS}}/g, tvsResponse.offer.restrictions.customerSegments)
							.replace(/{{SHIPPINGMETHODS}}/g, tvsResponse.offer.restrictions.shippingMethods)
							.replace(/{{STORES}}/g, tvsResponse.offer.restrictions.stores);
		if (tvsResponse.offer.restrictions.redemptionLimit != null) {
			templateString = templateString.replace(/{{REDEMPTIONLIMITDESCRIPTION}}/g, tvsResponse.offer.restrictions.redemptionLimit.description)
								.replace(/{{REDEMPTIONLIMITUSAGELIMIT}}/g, tvsResponse.offer.restrictions.redemptionLimit.usageLimit)
								.replace(/{{REDEMPTIONLIMITUSAGECOUNT}}/g, tvsResponse.offer.restrictions.redemptionLimit.usageCount)
								.replace(/{{REDEMPTIONLIMITCANSTILLBEUSED}}/g, tvsResponse.offer.restrictions.redemptionLimit.canStillBeUsed)
								.replace(/{{REDEMPTIONLIMITUSAGELIMITACTUAL}}/g, tvsResponse.offer.restrictions.redemptionLimit.usageLimitActual)
								.replace(/{{REDEMPTIONLIMITUSAGECOUNTACT}}/g, tvsResponse.offer.restrictions.redemptionLimit.usageCountActual);
		}
		templateString = templateString.replace(/{{SUBCHANNELS}}/g, tvsResponse.offer.restrictions.subChannels)
                            .replace(/{{MERCHANDISE}}/g, tvsResponse.offer.restrictions.merchandise);
        if (tvsResponse.offer.restrictions.threshold != null) {
            templateString = templateString.replace(/{{THRESHOLDAMOUNT}}/g, tvsResponse.offer.restrictions.threshold.amount)
                                .replace(/{{THRESHOLDQUANTITY}}/g, tvsResponse.offer.restrictions.threshold.quantity);
        }
	}

	templateString = templateString.replace(/{{OFFERNAME}}/g, tvsResponse.offer.name);
	templateString = templateString.replace(/{{CONFIRMATIONMESSAGE}}/g, tvsResponse.offer.confirmationMessage)
						.replace(/{{OFFERTYPE}}/g, tvsResponse.offer.offerType)
						.replace(/{{OFFERID}}/g, tvsResponse.offer.offerId)
						.replace(/{{PROMOCODE}}/g, tvsResponse.offer.promoCode)
						.replace(/{{DESCRIPTION}}/g, tvsResponse.offer.description)
						.replace(/{{AUTOAPPLY}}/g, tvsResponse.offer.autoApply);

	var disclaimerTextFromResponse = tvsResponse.offer.disclaimer;

	if (templateString && templateString.match(/(.*?) {{DISCLAIMER}}/)) {
		var printerIndexForDiscliamer = templateString.match(/(.*?) {{DISCLAIMER}}/)[1];
		var startLineNumber = printerIndexForDiscliamer.substring(7,11);
		var discliamerTextInLines = disclaimerTextFromResponse.split('\n');
		formattedDisclaimerText = discliamerTextInLines[0]+'\n';
		for (var j = 1; j < discliamerTextInLines.length; j++) {
			formattedDisclaimerText+=printerIndexForDiscliamer.replace(startLineNumber, leftZeroPadForLength4(parseInt(startLineNumber)+j*10))+" "+discliamerTextInLines[j]+'\n';
		}
		templateString = templateString.replace(/{{DISCLAIMER}}/g, formattedDisclaimerText);
	}

	if (isApology){
		templateString = mapApologyHeader(kcCLValue, templateString);
	} else {
		templateString = mapReturnsConfirmation(kcCLValue, templateString);
	}

	return templateString;
}

function mapKohlsCashResponseToPrintTemplate() {


}

function printOfflineCoupon(isApology) {
	if (isApology){
		printAsExternalDPL(getOfflineCouponPrintString(true));
	} else {
		printAsExternalDPL(getOfflineCouponPrintString());
	}
}

function getOfflineCouponPrintString(isApology) {
	var d = new Date();
	var date = String("00" + (d.getMonth() + 1)).slice(-2) + "/" +
		String("00" + d.getDate()).slice(-2) + "/" +
		d.getFullYear();
	var offlineCouponPrintString = offlineCouponTemplateString.replace(/{{TODAY}}/g, date);
	var kcCLValue = offlineCouponPrintString.match(/KcCL\d*/g);
	if (isApology){
		offlineCouponPrintString = mapApologyHeader(kcCLValue, offlineCouponPrintString);
	} else {
		offlineCouponPrintString = mapReturnsConfirmation(kcCLValue, offlineCouponPrintString);
	}
    return offlineCouponPrintString;
}

function printHoldLabel() {
	printAsExternalDPL(getHoldLabelPrintString());
}

function getHoldLabelPrintString() {
	const trackingId = window.localStorage.getItem("trackingId") || window.localStorage.getItem("ScannedID");
	if (!trackingId || typeof trackingId === 'undefined') {
		log("Message | Offline Coupon : TrackingID is undefined in getHoldLabelPrintString", "Error");
		return "";
	}
	var d = new Date();
	var date = String("00" + (d.getMonth() + 1)).slice(-2) + "/" +
		String("00" + d.getDate()).slice(-2) + "/" +
		d.getFullYear();
	var time = String("00" + d.getHours()).slice(-2) + ":" +
		String("00" + d.getMinutes()).slice(-2);
	var qrData = trackingId + "|" + "HOLDLABEL" + "|" + localStorage.getItem("hazmatClass") + "|" +
		localStorage.getItem('packedBy').toUpperCase() + "|" +
		localStorage.getItem('isItemDamaged').toUpperCase() + "|" +
		localStorage.getItem('manufacturerPackageDamaged');
	log("~Message |  HoldLabel QRData : "+ qrData.replace(/\|/g, ",") + "~location ID | " + localStorage.getItem("locationId") + "~associate ID |" + localStorage.getItem("associateId"));
	holdLabelTemplateString = holdLabelTemplateString.replace(/{{DATETIME}}/g, date+" "+time)
									.replace(/{{QRCode}}/g, qrData)
									.replace(/{{TRACKINGID}}/g, trackingId);
									//.replace(/{{TODAY}}/g, date)
									//.replace(/{{PACKAGEDBY}}/g, localStorage.getItem('packedBy') === 'customer' ? 'CUSTOMER' : 'KOHLS')
									//.replace(/{{ITEMDAMAGEINDICATOR}}/g, localStorage.getItem('isItemDamaged') === 'true' ? 'YES' : 'NO')
                                    //.replace(/{{PACKAGEDAMAGEINDICATOR}}/g, localStorage.getItem('manufacturerPackageDamaged'));
    return holdLabelTemplateString;
}


function printRMALabel() {
	var d = new Date();
	var date = String("00" + (d.getMonth() + 1)).slice(-2) + "/" +
		String("00" + d.getDate()).slice(-2) + "/" +
		d.getFullYear();

	var rmaCount =  window.localStorage.getItem("packedBy") === "kohls"  ? 2 : 1;

	var rmaLabelPrintTemplateString = rmaLabelPrintTemplate.replace(/{{FROMADDRESS1}}/g, localStorage.getItem("FROM1"))
										.replace(/{{FROMADDRESS2}}/g, localStorage.getItem("FROM2"))
										.replace(/{{FROMADDRESS3}}/g, localStorage.getItem("FROM3"))
										.replace(/{{FROMADDRESS4}}/g, localStorage.getItem("FROM4"))
										.replace(/{{RCADDRESS1}}/g, localStorage.getItem("TO1"))
										.replace(/{{RCADDRESS2}}/g, localStorage.getItem("TO2"))
										.replace(/{{RCADDRESS3}}/g, localStorage.getItem("TO3"))
										.replace(/{{RCADDRESS4}}/g, localStorage.getItem("TO4"))
										.replace(/{{RMAID}}/g, localStorage.getItem("Barcode1"))
										.replace(/{{TRACKINGID}}/g, localStorage.getItem("trackingId"))
										.replace(/{{NOTE1}}/g, localStorage.getItem("FooterNote1"))
										.replace(/{{NOTE2}}/g, localStorage.getItem("FooterNote2"))
										.replace(/{{TODAY}}/g, date)
										.replace(/{{TICKETCOUNT}}/g, 1);
	while (rmaCount > 0) {
		printAsExternalDPL(rmaLabelPrintTemplateString);
		pauseBrowser(7000);
		rmaCount--;
	}

	window.localStorage.setItem('printReceipt', rmaLabelPrintTemplateString);
}

function printReturnsConfirmation() {
	let d = new Date();
	let date = String("00" + (d.getMonth() + 1)).slice(-2) + "/" +
		String("00" + d.getDate()).slice(-2) + "/" +
		d.getFullYear() + "  " +
		String("00" + d.getHours()).slice(-2) + ":" +
		String("00" + d.getMinutes()).slice(-2);

	let trackingIdsRCVDListString = localStorage.getItem('trackingIdsRCVDList')?localStorage.getItem('trackingIdsRCVDList'):localStorage.getItem('trackingId');
	let trackingIdsRCVDList = trackingIdsRCVDListString ? trackingIdsRCVDListString.split(',') : [];
	let finalTemplatelength = returnsConfirmationDefaultPageLength + (trackingIdsRCVDList.length * 15);

	if (returnsConfirmationTemplate && returnsConfirmationTemplate.match(/(.*?) Tracking ID: {{TRACKINGID}}/)) {
		let rcTrackingIdLine = returnsConfirmationTemplate.match(/(.*?) Tracking ID: {{TRACKINGID}}/)[1];
		let startLineNumber = rcTrackingIdLine.substring(7,11);
		let formattedTrackingId = trackingIdsRCVDList[0]+'\n';
		let j =  1;
		while(j < trackingIdsRCVDList.length) {
			formattedTrackingId+=rcTrackingIdLine.replace(startLineNumber, leftZeroPadForLength4(parseInt(startLineNumber)+j*15))+" "+trackingIdsRCVDList[j]+'\n';
			j++;
		}
		formattedTrackingId+=rcTrackingIdLine.replace(startLineNumber, leftZeroPadForLength4(parseInt(startLineNumber)+j*15))+" ------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
		returnsConfirmationTemplate = returnsConfirmationTemplate.replace(/{{TRACKINGID}}/g, formattedTrackingId);
	}

	returnsConfirmationTemplate = returnsConfirmationTemplate.replace(/{{STORENUMBER}}/g, window.localStorage.getItem("storeId"))
									.replace(/{{DATETIME}}/g, date)
									.replace(/{{RECEIPTCONFIRMATIONRECEIPTLENGTH}}/g, finalTemplatelength);

	printAsExternalDPL(returnsConfirmationTemplate);
	log("~TrackingID | " + trackingIdsRCVDListString + "~Message | Printed ReturnConfirmation", "Info");
	localStorage.removeItem('trackingIdsRCVDList');
}

function mapReturnsConfirmation(kcCLValue, templateString) {
	let d = new Date();
	let date = String("00" + (d.getMonth() + 1)).slice(-2) + "/" +
		String("00" + d.getDate()).slice(-2) + "/" +
		d.getFullYear() + "  " +
		String("00" + d.getHours()).slice(-2) + ":" +
		String("00" + d.getMinutes()).slice(-2);
	var labelLengthArray = kcCLValue.toString().match(/\d/g);
	var labelLength = labelLengthArray.join("");
	templateString = templateString.replace(/Q1/g, returnsConfirmationTemplate);
	let trackingIdsRCVDListString = localStorage.getItem('trackingIdsRCVDList')?localStorage.getItem('trackingIdsRCVDList'):localStorage.getItem('trackingId');
	let trackingIdsRCVDList = trackingIdsRCVDListString ? trackingIdsRCVDListString.split(',') : [];
	let finalTemplatelength = parseInt(labelLength);
	
	if (templateString && templateString.match(/(.*?) Tracking ID: {{TRACKINGID}}/)) {

		templateString = templateString.replace(/{{HEADER}}/g, leftZeroPadForLength4(parseInt(labelLength)+10))
									.replace(/{{TEXT1}}/g, leftZeroPadForLength4(parseInt(labelLength)+30))
									.replace(/{{TEXT2}}/g, leftZeroPadForLength4(parseInt(labelLength)+43))
									.replace(/{{TEXT3}}/g, leftZeroPadForLength4(parseInt(labelLength)+56))
									.replace(/{{TEXT4}}/g, leftZeroPadForLength4(parseInt(labelLength)+80))
									.replace(/{{TEXT5}}/g, leftZeroPadForLength4(parseInt(labelLength)+95))
									.replace(/{{TEXT6}}/g, leftZeroPadForLength4(parseInt(labelLength)+110));
		let rcTrackingIdLine = templateString.match(/(.*?) Tracking ID: {{TRACKINGID}}/)[1];
		let startLineNumber = rcTrackingIdLine.substring(7,11);
		let formattedTrackingId = trackingIdsRCVDList[0]+'\n';
		let j =  1;
		while(j < trackingIdsRCVDList.length) {
			formattedTrackingId+=rcTrackingIdLine.replace(startLineNumber, leftZeroPadForLength4(parseInt(startLineNumber)+j*15))+" "+trackingIdsRCVDList[j]+'\n';
			j++;
		}
		formattedTrackingId+=rcTrackingIdLine.replace(startLineNumber, leftZeroPadForLength4(parseInt(startLineNumber)+j*15))+" ------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
		templateString = templateString.replace(/{{TRACKINGID}}/g, formattedTrackingId);
		finalTemplatelength = parseInt(startLineNumber) + (trackingIdsRCVDList.length * 15) + 10;
	}
		
		templateString = templateString.replace(/{{STORENUMBER}}/g, window.localStorage.getItem("storeId"))
										.replace(/{{DATETIME}}/g, date)
										.replace(kcCLValue, "KcCL"+finalTemplatelength);
		
	log("~TrackingID | " + trackingIdsRCVDListString + "~Message | Printed ReturnConfirmation" + "~location ID | " + localStorage.getItem("locationId") + "~associate ID |" + localStorage.getItem("associateId"), "Info");
	localStorage.removeItem('trackingIdsRCVDList');
	return templateString;
}

function leftZeroPadForLength4(value) {
	if (!value) {
		return value;
	}
	var pad = "0000"
	var str=value.toString();
	return pad.substring(0, pad.length - str.length) + str;
}

function formatTVSDateFormatToCouponDate(date) {
	var parts = date.split('-');
	if (parts.length == 3) {
		return parts[1]+"/"+parts[2]+"/"+parts[0];
	} else {
		return date;
	}
}

function printApologyHeader() {
	var d = new Date();
	var date = String("00" + (d.getMonth() + 1)).slice(-2) + "/" +
		String("00" + d.getDate()).slice(-2) + "/" +
		d.getFullYear() + "  " +
		String("00" + d.getHours()).slice(-2) + ":" +
		String("00" + d.getMinutes()).slice(-2);

	var apologyHeaderString = apologyHeaderTemplate.replace(/{{STORENUMBER}}/g, window.localStorage.getItem("storeId"))
								.replace(/{{DATETIME}}/g, date);

	printAsExternalDPL(apologyHeaderString);
}

function mapApologyHeader(kcCLValue, templateString) {
	var d = new Date();
	var date = String("00" + (d.getMonth() + 1)).slice(-2) + "/" +
		String("00" + d.getDate()).slice(-2) + "/" +
		d.getFullYear() + "  " +
		String("00" + d.getHours()).slice(-2) + ":" +
		String("00" + d.getMinutes()).slice(-2);

		var labelLengthArray = kcCLValue.toString().match(/\d/g);
		var labelLength = labelLengthArray.join("");
		let finalTemplatelength = parseInt(labelLength) + 55;
		templateString = templateString.replace(/Q1/g, apologyHeaderTemplate);
		templateString = templateString.replace(/{{TEXT1}}/g, leftZeroPadForLength4(parseInt(labelLength)+15))
								.replace(/{{TEXT2}}/g, leftZeroPadForLength4(parseInt(labelLength)+35))
								.replace(/{{END}}/g, leftZeroPadForLength4(parseInt(labelLength)+50))
								.replace(/{{STORENUMBER}}/g, window.localStorage.getItem("storeId"))
								.replace(/{{DATETIME}}/g, date)
								.replace(kcCLValue, "KcCL"+finalTemplatelength);

	return templateString;
}

function printAsExternalDPL(printString) {
	if (!printString) {
		// TODO: LOG ERROR
		return;
	}
	// Print Label
	printLabel(externalDPLPrintObj.replace(/{{PRINTTEMPLATESTRING}}/g, printString));
}

function pauseBrowser(millis) {
    const date = Date.now();
    let curDate = null;
    do {
        curDate = Date.now();
    } while (curDate - date < millis);
}

function handleKohlsCashResponse(kohlsCash, printTemplate) {
	var kcCLValue = printTemplate.match(/KcCL\d*/g);
	printTemplate = mapReturnsConfirmation(kcCLValue, printTemplate);
	return printTemplate.replace(/{{KCAMOUNT}}/g, kohlsCash.amount)
		.replace(/{{BARCODE}}/g, kohlsCash.barcode)
		.replace(/{{PIN}}/g, kohlsCash.pin)
		.replace(/{{REDEEMSTARTDATE}}/g, formatTVSDateFormatToCouponDate(kohlsCash.redemptionStartDate))
		.replace(/{{REDEEMENDDATE}}/g, formatTVSDateFormatToCouponDate(kohlsCash.redemptionEndDate));
}

function handleOfferResponse(offer, printTemplate, isApology) {
	if (isApology) {
		return mapTVSResponseToPrintTemplate(offer, printTemplate, true);
	} else {
		return mapTVSResponseToPrintTemplate(offer, printTemplate);
	}
}

function generateAndPrintPromotion(trackingIds, templateURL, action) {
	var self = this;
	self.errMessage.html("");
	self.loader.show();
	if(offlineFlag === "true") {
		printOfflineCoupon();
		log("~Message | Printed OfflineCoupon in Offline Mode" + "~Tracking ID | " + JSON.stringify(trackingIds) + "~location ID | " + localStorage.getItem("locationId") + "~associate ID |" + localStorage.getItem("associateId"));		
		//printReturnsConfirmation();
		if (action == "InitiateReturn") {
			setTimeout(function () {
				self.loader.hide();
				window.location.href = "../PrintAcknowledgment/print-acknowledgment.html?nav=infoSection";
			}, 5000);
			return;
		}
	}
	try {
		url=localStorage.getItem("promotionAPIDomain") + "kreturns/promotions";
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth()+1; //January is 0!
		let yyyy = today.getFullYear();
		if(dd<10){
			dd='0'+dd;
		}
		if(mm<10){
			mm='0'+mm;
		}
		let dateStr = yyyy+'-'+mm+'-'+dd;
		let timeStr = today.toTimeString().split(' ')[0];
		const startDate = new Date();
		startDate.setHours(0,0,0,0);
		const endDate = new Date();
		const searchStartTime = startDate.getTime();
		const searchEndTime = endDate.getTime();
		reqBody={
			"trackingIds": trackingIds,
			"timestamp": dateStr+" " + timeStr,
			"locationId": localStorage.getItem("locationId"),
			"searchStartTimeInMillis": searchStartTime,
			"searchEndTimeInMillis": searchEndTime
		};
		let headerObj = {
			"Content-Type": "application/json",
			"location-number": localStorage.getItem("Location-Number"),
			"associate-id": localStorage.getItem("associateId"),
			'X-KOHLS-CorrelationID': getCorrelationID(),
			'Authorization': "Basic "+localStorage.getItem('promotionsAPIClientIDAndSecretKey')
		};

		$.ajax({
			url: url,
			type: 'POST',
			headers: headerObj,
			json: true,
			data: JSON.stringify(reqBody),
			success: function(resp){
				// Logging to Splunk
				logAPI('POST', 'success', url, headerObj, reqBody, resp);
				// Check for Null in reponse and replace with empty string
				replaceNull(resp);
				if (!resp
						|| !resp.type
						|| !resp.printTemplate
						|| resp.error) {
					log("~Message | Error in Promotion response because of empty type or empty printTemplate or error in response, hence priting Offline Coupon "+JSON.stringify(resp));
					printOfflineCoupon();
					log("~Message | Printed OfflineCoupon due to empty type or empty printTemplate in DB" + "~Tracking ID | " + localStorage.getItem('trackingIdsRCVDList') + "~location ID | " + localStorage.getItem("locationId") + "~associate ID |" + localStorage.getItem("associateId"));	
					return;
				}
				let printTemplateString;
				$.get(templateURL+resp.printTemplate+".html", function(templateData) {
					switch (resp.type) {
						case "Offer":
							printTemplateString = handleOfferResponse(resp.offer, templateData);
							var printObjString = externalDPLTemplate.replace(/{{PRINTTEMPLATESTRING}}/g, printTemplateString);
							window.localStorage.setItem('printReceipt', printObjString);
							// 1. Print Customer Coupon
							printLabel(printObjString);
							log("~TrackingID | " + localStorage.getItem('trackingIdsRCVDList') + "~SUPC | " + resp.offer.upc + "~PrintTemplate |"+resp.printTemplate+"~Message | "+action+" : SUPC Call is Successful", "Info");
							// 2. Print Returns Confirmation
							//printReturnsConfirmation();
							if (action == "InitiateReturn") {
								setTimeout(function () {
									self.loader.hide();
									window.location.href = "../PrintAcknowledgment/print-acknowledgment.html?nav=infoSection";
								}, 5000);
							}
							break;
						case "KohlsCash":
							printTemplateString = handleKohlsCashResponse(resp.kohlsCash, templateData);
							var printObjString = externalDPLTemplate.replace(/{{PRINTTEMPLATESTRING}}/g, printTemplateString);
							window.localStorage.setItem('printReceipt', printObjString);
							// 1. Print Customer Coupon
							printLabel(printObjString);
							log("~TrackingID | " + localStorage.getItem('trackingIdsRCVDList') + "~KohlsCashBarcode | " + resp.kohlsCash.barcode + "~PrintTemplate |"+resp.printTemplate+"~Message | "+action+" : KohlsCash Call is Successful", "Info");
							// 2. Print Returns Confirmation
							//printReturnsConfirmation();
							if (action == "InitiateReturn") {
								setTimeout(function () {
									self.loader.hide();
									window.location.href = "../PrintAcknowledgment/print-acknowledgment.html?nav=infoSection";
								}, 5000);
							}
							break;
						default:
							log("~Message | Promotion Response type is neither KohlsCash nor Offer, so printing Offline Coupon "+resp.type);
							printOfflineCoupon();
							log("~Message | Printed OfflineCoupon due to wrong Offer setup in DB" + "~Tracking ID | " + localStorage.getItem('trackingIdsRCVDList') + "~location ID | " + localStorage.getItem("locationId") + "~associate ID |" + localStorage.getItem("associateId"));		
							//printReturnsConfirmation();
							if (action == "InitiateReturn") {
								setTimeout(function () {
									self.loader.hide();
									window.location.href = "../PrintAcknowledgment/print-acknowledgment.html?nav=infoSection";
								}, 5000);
							}
					}
				}).fail(function() {
					log("~TrackingID | " + localStorage.getItem('trackingIdsRCVDList') + "~PrintTemplate | "+ resp.printTemplate + "~Message | Printing OfflineCoupon as PrintTemplateMismatch", "Error");
					// 1. Print Offline Coupon
					printOfflineCoupon();
					log("~Message | Printed OfflineCoupon due to Promotion API call failure" + "~Tracking ID | " + localStorage.getItem('trackingIdsRCVDList') + "~location ID | " + localStorage.getItem("locationId") + "~associate ID |" + localStorage.getItem("associateId"));
					// 2. Print Returns Confirmation
					//printReturnsConfirmation();
					if (action == "InitiateReturn") {
						setTimeout(function () {
							self.loader.hide();
							window.location.href = "../PrintAcknowledgment/print-acknowledgment.html?nav=infoSection";
						}, 5000);
					}
				});
			}, error: function(response, textstatus){
				log("~TrackingID | " + localStorage.getItem('trackingIdsRCVDList') + "~Response | " + JSON.stringify(response) + "~status | " + textstatus + "~Message | "+action+" : Promotion API Call Failed", "Error");
				logAPI('POST', 'error', url, headerObj, reqBody, '', response, response.statusText);
				if (response.status == 409){
					//print New Template 
					$.get(templateURL+"DUPLICATE_RETURNS_RECEIPT.html", function(templateData) {
						log("~Message | Printed DUPLICATE_RETURNS_RECEIPT Template as the TrackingIds were already recieved in same day" + "~Tracking ID | " + localStorage.getItem('trackingIdsRCVDList') + "~location ID | " + localStorage.getItem("locationId") + "~associate ID |" + localStorage.getItem("associateId"));
						var kcCLValue = templateData.match(/KcCL\d*/g);
						let printTemplate = mapReturnsConfirmation(kcCLValue, templateData);
						printAsExternalDPL(printTemplate);
					}).fail(function() {
						log("~Message | Printed Offline coupon Template as the DUPLICATE_RETURNS_RECEIPT Template is missing or can't connect to S3" + "~Tracking ID | " + localStorage.getItem('trackingIdsRCVDList') + "~location ID | " + localStorage.getItem("locationId") + "~associate ID |" + localStorage.getItem("associateId"));
						printOfflineCoupon();
					});
				} else {
					// 1. Print Offline Coupon
					printOfflineCoupon();
					log("~Message | Printed OfflineCoupon due to Promotion API call failure" + "~Tracking ID | " + localStorage.getItem('trackingIdsRCVDList') + "~location ID | " + localStorage.getItem("locationId") + "~associate ID |" + localStorage.getItem("associateId"));
					// 2. Print Returns Confirmation
					//printReturnsConfirmation();	
				}
				
				self.loader.hide();
				if (action == "InitiateReturn") {
					setTimeout(function () {
						self.loader.hide();
						window.location.href = "../PrintAcknowledgment/print-acknowledgment.html?nav=infoSection";
					}, 5000);
				}
			}
		});
	} catch (error) {
		self.loader.hide();
		errorTone();
		errMessage.html(errDesc[1117], error);
		log("~TrackingID | " + trackingId + "~Error Message | " + self.errMessage + "~Message | "+action+" : Error", "Error");
	}

}
