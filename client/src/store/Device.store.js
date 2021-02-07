import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
  constructor() {
    this._types = []
    this._selectedType = {}
    this._brands = []
    this._selectedBrand = {}
    this._devices = []
    this._page = 1
    this._totalCount = 0
    this._limit = 3
    makeAutoObservable(this)
  }

  setTypes(types) {
    this._types = types
  }

  setSelectedType(type) {
    this._selectedType = type
  }

  setBrands(brands) {
    this._brands = brands
  }

  setSelectedBrand(brand) {
    this._selectedBrand = brand
  }

  setDevices(devices) {
    this._devices = devices
  }

  setPage(page) {
    this._page = page
  }

  setTotalCount(totalCount) {
    this._totalCount = totalCount
  }

  setLimit(limit) {
    this._limit = limit
  }

  get types() {
    return this._types
  }

  get selectedType() {
    this.setPage(1)
    return this._selectedType
  }

  get brands() {
    return this._brands
  }

  get selectedBrand() {
    this.setPage(1)
    return this._selectedBrand
  }

  get devices() {
    return this._devices
  }

  get page() {
    return this._page
  }

  get totalCount() {
    return this._totalCount
  }

  get limit() {
    return this._limit
  }
}
