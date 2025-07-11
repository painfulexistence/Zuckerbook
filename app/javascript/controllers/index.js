// Import and register all your controllers from the importmap under controllers/**/*_controller
import { application } from "./application"

// Eager load all controllers defined in the import map under controllers/**/*_controller
// For now, we'll manually import controllers as needed
// import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
// eagerLoadControllersFrom("controllers", application)

// Lazy load controllers as they appear in the DOM (remember not to preload controllers in import map!)
// import { lazyLoadControllersFrom } from "@hotwired/stimulus-loading"
// lazyLoadControllersFrom("controllers", application)
