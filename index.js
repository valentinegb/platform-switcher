import { Plugin } from '@vizality/entities';
import { patch, unpatchAll } from '@vizality/src/core/modules/patcher';
import { getModule } from '@vizality/src/core/modules/webpack';

export default class PlatformSwitcher extends Plugin {
  start () {
    [ 'isWindows', 'isOSX', 'isLinux' ]
      .forEach((value, index) => {
        patch(getModule('getPlatform'), value, () =>
          this.settings.get('platform', 0) === index
        );
      });

    // isWeb returns true if previous funtions all return false
  }

  stop () {
    unpatchAll('platform-switcher');
  }
}
