package com.foxcommerce.payloads

final case class CustomerPayload(name: String, email: String, address: AddressPayload,
  storeCreditCount: Long = 0, storeCreditTotal: Long = 0, isBlacklisted: Boolean = false, isDisabled: Boolean = false)