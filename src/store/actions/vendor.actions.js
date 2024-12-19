import { vendorService } from "../../services/vendor/vendor";
import { store } from "../store";

import {
  ADD_VENDOR,
  REMOVE_VENDOR,
  SET_VENDORS,
  SET_VENDOR,
  UPDATE_VENDOR,
  ADD_VENDOR_MSG,
} from "../reducers/vendor.reducer"; // כל פעולות ה-Redux שונו מ-Car ל-Vendor

export async function loadVendors(filterBy = "") {
  try {
    const storedVendors = localStorage.getItem('vendors')
    if(storedVendors){
      console.log("Vendors loaded from localStorage:", JSON.parse(storedVendors))
      store.dispatch(getCmdSetVendors(JSON.parse(storedVendors)))
      return
    }

    const vendors = await vendorService.query(filterBy);
    console.log("vendors from actions:", vendors);

    
    localStorage.setItem("vendors", JSON.stringify(vendors))

    store.dispatch(getCmdSetVendors(vendors));
  } catch (err) {
    console.log("Cannot load vendors", err);
    throw err;
  }
}

export async function loadVendor(vendorId) {
  try {
    const vendor = await vendorService.getById(vendorId);
    store.dispatch(getCmdSetVendor(vendor));
  } catch (err) {
    console.log("Cannot load vendor", err);
    throw err;
  }
}

export async function removeVendor(vendorId) {
  try {
    console.log('remove vendor id:',vendorId)
    await vendorService.remove(vendorId);
    store.dispatch(getCmdRemoveVendor(vendorId));
  } catch (err) {
    console.log("Cannot remove vendor", err);
    throw err;
  }
}

export async function addVendor(vendor) {
  try {
    const savedVendor = await vendorService.save(vendor);
    store.dispatch(getCmdAddVendor(savedVendor));
    return savedVendor;
  } catch (err) {
    console.log("Cannot add vendor", err);
    throw err;
  }
}

export async function updateVendor(vendor) {
  try {
    const savedVendor = await vendorService.save(vendor);
    store.dispatch(getCmdUpdateVendor(savedVendor));
    return savedVendor;
  } catch (err) {
    console.log("Cannot save vendor", err);
    throw err;
  }
}

export async function addVendorMsg(storeId, txt) {
  try {
    const msg = await storeService.addStoreMsg(storeId, txt);
    store.dispatch(getCmdAddVendorMsg(msg));
    return msg;
  } catch (err) {
    console.log("Cannot add vendor msg", err);
    throw err;
  }
}

// Command Creators:
function getCmdSetVendors(vendors) {
  return {
    type: SET_VENDORS,
    vendors,
  };
}
function getCmdSetVendor(vendor) {
  return {
    type: SET_VENDOR,
    vendor,
  };
}
function getCmdRemoveVendor(vendorId) {
  return {
    type: REMOVE_VENDOR,
    vendorId,
  };
}
function getCmdAddVendor(vendor) {
  return {
    type: ADD_VENDOR,
    vendor,
  };
}
function getCmdUpdateVendor(vendor) {
  return {
    type: UPDATE_VENDOR,
    vendor,
  };
}
function getCmdAddVendorMsg(msg) {
  return {
    type: ADD_VENDOR_MSG,
    msg,
  };
}

// unitTestActions()
async function unitTestActions() {
  await loadVendors();
  await addVendor(vendorService.getEmptyVendor()); // שונה מ-getEmptyCar ל-getEmptyVendor
  await updateVendor({
    _id: "m1oC7",
    title: "Vendor-Good",
  });
  await removeVendor("m1oC7");
  // TODO unit test addVendorMsg
}
