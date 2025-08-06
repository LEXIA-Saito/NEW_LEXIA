// Three.jsを動的にインポートして、MIMEタイプエラーを回避
let THREE: any = null;

export const loadThree = async () => {
  if (typeof window !== 'undefined' && !THREE) {
    try {
      // 動的インポートでThree.jsを読み込み
      THREE = await import('three');
      return THREE;
    } catch (error) {
      console.warn('Three.js could not be loaded:', error);
      // フォールバック用のモックオブジェクト
      return {
        Vector2: class { constructor(x = 0, y = 0) { this.x = x; this.y = y; } },
        Vector3: class { constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; } },
        ShaderMaterial: class { constructor(props: any) { Object.assign(this, props); } },
        GLSL3: 'GLSL3',
        CustomBlending: 1,
        SrcAlphaFactor: 1,
        OneFactor: 1,
        Mesh: class { constructor() {} }
      };
    }
  }
  return THREE;
};

export { THREE };
export default THREE;
