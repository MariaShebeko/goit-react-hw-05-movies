import { TinyButton as ScrollUpButton } from 'react-scroll-up-button';

export default function ScrollUp() {
  return (
    <ScrollUpButton
      StopPosition={0}
      ShowAtPosition={150}
      EasingType="easeOutCubic"
      AnimationDuration={500}
      ContainerClassName="ScrollUpButton__Container"
      TransitionClassName="ScrollUpButton__Toggled"
      style={{ fill: '#99f2f5' }}
      ToggledStyle={{}}
    />
  );
}
