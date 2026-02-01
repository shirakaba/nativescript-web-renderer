import "@nativescript/macos-node-api";

export class ApplicationDelegate
  extends NSObject
  implements NSApplicationDelegate
{
  static ObjCProtocols = [NSApplicationDelegate];

  static {
    NativeClass(this);
  }

  applicationDidFinishLaunching(_notification: NSNotification) {
    const menu = NSMenu.new();
    NSApp.mainMenu = menu;

    const appMenuItem = NSMenuItem.new();
    menu.addItem(appMenuItem);

    const appMenu = NSMenu.new();
    appMenuItem.submenu = appMenu;

    appMenu.addItemWithTitleActionKeyEquivalent("Quit", "terminate:", "q");

    const controller = NSViewController.new();
    const hostView = controller.view;
    const textView = NSTextView.alloc().initWithFrame(NSZeroRect);
    textView.translatesAutoresizingMaskIntoConstraints = false;
    hostView.addSubview(textView as unknown as NSView);

    NSLayoutConstraint.activateConstraints([
      textView.leadingAnchor.constraintEqualToAnchor(hostView.leadingAnchor),
      textView.trailingAnchor.constraintEqualToAnchor(hostView.trailingAnchor),
      textView.topAnchor.constraintEqualToAnchor(hostView.topAnchor),
      textView.bottomAnchor.constraintEqualToAnchor(hostView.bottomAnchor),
    ]);
    const window = NSWindow.windowWithContentViewController(controller);

    window.title = "NativeScript for macOS";
    window.delegate = this;
    window.styleMask =
      NSWindowStyleMask.Titled |
      NSWindowStyleMask.Closable |
      NSWindowStyleMask.Miniaturizable |
      NSWindowStyleMask.Resizable |
      NSWindowStyleMask.FullSizeContentView;

    window.titlebarAppearsTransparent = true;
    window.titleVisibility = NSWindowTitleVisibility.Hidden;

    window.makeKeyAndOrderFront(this);

    NSApp.activateIgnoringOtherApps(false);
  }
}

const NSApp = NSApplication.sharedApplication;

NSApp.setActivationPolicy(NSApplicationActivationPolicy.Regular);

// Class is lazily initialized when first used
NSApp.delegate = ApplicationDelegate.new();

NSApp.run();
