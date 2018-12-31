// callback IntersectionObserverCallback = void (sequence<IntersectionObserverEntry> entries, IntersectionObserver observer)
//
// [Constructor(IntersectionObserverCallback callback, optional IntersectionObserverInit options),
//  Exposed=Window]
// interface IntersectionObserver {
//   readonly attribute Element? root;
//   readonly attribute DOMString rootMargin;
//   readonly attribute sequence<double> thresholds;
//   void observe(Element target);
//   void unobserve(Element target);
//   void disconnect();
//   sequence<IntersectionObserverEntry> takeRecords();
// };
//
// [Constructor(IntersectionObserverEntryInit intersectionObserverEntryInit)]
// interface IntersectionObserverEntry {
//   readonly attribute DOMHighResTimeStamp time;
//   readonly attribute DOMRectReadOnly rootBounds;
//   readonly attribute DOMRectReadOnly boundingClientRect;
//   readonly attribute DOMRectReadOnly intersectionRect;
//   readonly attribute double intersectionRatio;
//   readonly attribute Element target;
// };
//
// dictionary IntersectionObserverEntryInit {
//   required DOMHighResTimeStamp time;
//   required DOMRectInit rootBounds;
//   required DOMRectInit boundingClientRect;
//   required DOMRectInit intersectionRect;
//   required double intersectionRatio;
//   required Element target;
// };
//
// dictionary IntersectionObserverInit {
//   Element?  root = null;
//   DOMString rootMargin = "0px";
//   (double or sequence<double>) threshold = 0;
// };

interface Bounds {
  readonly height: number;
  readonly width: number;
  readonly top: number;
  readonly left: number;
  readonly right: number;
  readonly bottom: number;
}

interface IntersectionObserverEntry {
  readonly time: number;
  readonly rootBounds: Bounds;
  readonly boundingClientRect: Bounds;
  readonly intersectionRect: Bounds;
  readonly intersectionRatio: number;
  readonly target: Element;
}

type IntersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;

interface IntersectionObserverInit {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

declare class IntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: number[];

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit);

  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
  takeRecords(): IntersectionObserverEntry[];
}
